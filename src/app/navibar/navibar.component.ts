import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';

import { Location } from '@angular/common';
import { NavbarService } from '../navbar.service';
import { NgbModal, ModalDismissReasons, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

import { LoginService } from '../login.service';
import { SignupService } from '../signup.service';

import { User } from '../user.model';
import { ElementRef, HostListener } from '@angular/core';
import { Injectable } from '@angular/core';
import { ITS_JUST_ANGULAR } from '@angular/core/src/r3_symbols';
import { tokenName } from '@angular/compiler';
import { ModalContainerComponent } from 'angular-bootstrap-md';

@Component({
    selector: 'app-navibar',
    templateUrl: './navibar.component.html',
    styleUrls: ['./navibar.component.scss']
})
export class NavibarComponent implements OnInit {

    public routeVar = "/counter";
    userLogin: User = new User();
    userSignUp: User = new User();
    manualUserNumber: boolean = false;
    signUpErrors: string[] = [];
    loginErrors: string[] = [];
    passwordRepeat:string;
    token:string;
    isLoggedIn:boolean=false;

    @ViewChild('success', {read: TemplateRef}) successModal: TemplateRef<any>;


    constructor(private nbService: NavbarService, private modalService: NgbModal, private loginService: LoginService, private signupService: SignupService) 
    {
        this.userSignUp.userName = "";
        this.userSignUp.email = "";
        this.userSignUp.password = "";
        this.userSignUp.userNumber = "";
    }

    //Check for authorization token (jwt) on init.
    async ngOnInit() 
    {
        if(this.loginService.getToken())
        {
            this.userLogin = await this.loginService.loginAuthToken();
            if(this.userLogin.userName != null)
            {
                console.log(this.userLogin);
                this.isLoggedIn = true;
            }
            else
            {
                this.loginService.removeToken();
                this.isLoggedIn = false;
            }
        }
    }

    //Check for errors/requirements on signup field.
    async checkForErrors()
    {        
        this.signUpErrors = [];
        
        var uNameExist;    
        uNameExist = await this.signupService.checkUserName(this.userSignUp.userName,this.userSignUp.userNumber);
        
        var uEmailExist;
        uEmailExist = await this.signupService.checkEmail(this.userSignUp.email);

        if(uNameExist)
            this.signUpErrors.push("Username with usernumber already in use")

        if(uEmailExist)
            this.signUpErrors.push("Email is already in use")

        if(this.userSignUp.password != "" && this.userSignUp.password != this.passwordRepeat)
            this.signUpErrors.push("Passwords do not match");

        if(this.userSignUp.userName != null)
            if(this.userSignUp.userName != "" && this.userSignUp.userName.length < 3)
                this.signUpErrors.push("Username must be at least 3 characters long") 

        console.log(this.signUpErrors);
    }

    //Check if fields are empty in newUser
    checkForEmpty()
    {
        for(var b in this.userSignUp)
        {
            if(this.userSignUp[b] == [] || this.userSignUp[b] == "")
            {
                this.signUpErrors.push(b +" is empty");
            }
        }
    }

    //Only numbers can be inserted in this field.
    onlyNumberKey(event) 
    {
        return (event.charCode == 8 || event.charCode == 0) ? null : event.charCode >= 48 && event.charCode <= 57;
    }

    //Edits the usernumber to a length of 4 numbers ex. 32 --> 0032
    editNumber() 
    {
        this.checkForErrors();
        while (this.userSignUp.userNumber.length < 4)
        {
            this.userSignUp.userNumber = "0" + this.userSignUp.userNumber;
        }
    }

    public async createUser() 
    {     
        await this.checkForErrors(); 
        this.checkForEmpty();

        if(this.signUpErrors.length == 0)
        {
            await this.signupService.createUser(this.userSignUp).then(
                response => console.log(response),
                error =>this.signUpErrors.push(error.error)
            )

            if(this.signUpErrors.length == 0)
            {
                this.modalService.dismissAll();
                this.modalService.open(this.successModal);
            }
        }
    }

    public async login()
    {
        this.loginErrors = [];
        console.log(this.userLogin.userName);
        await this.loginService.login(this.userLogin.userName,this.userLogin.password).then(
            response => this.loginService.setToken(response),
            error => this.loginErrors.push(error.error)
        )
        if(this.loginService.getToken())
        {
            this.userLogin = await this.loginService.loginAuthToken();
            console.log(this.userLogin);
            this.isLoggedIn = true;
            this.modalService.dismissAll();
            this.modalService.open(this.successModal);

        }
    }

    //Sign up form user number checkbox for filling in manually or changing unumber.
    public cbTriggerUserNumber() 
    {
        this.checkForErrors();
        this.randomUserNumber();
        this.manualUserNumber = !this.manualUserNumber;
    }

    //When navbar item is clicked, active page is changed. This also changes the class of the element to show which page is active
    triggerActive(e: Event) 
    {
        const pageId = (e.target as Element).id;
        document.getElementById(this.nbService.activePage)?.classList.remove("active");
        var element = document.getElementById(pageId)?.classList.add("active");

        this.nbService.activePage = pageId;
    }

    openLoginModal(modal: any) 
    {
        this.modalService.open(modal);
    }

    openSignUpModal(modal: any)
    {
        this.randomUserNumber();
        this.modalService.open(modal);
    }

    //Generates random number between 0-9999
    randomUserNumber()
    {
        var min = Math.ceil(0);
        var max = Math.floor(9999);
        var randNumber = Math.floor(Math.random() * (max - min + 1)) + 1;
        this.userSignUp.userNumber = randNumber.toString();
        while (this.userSignUp.userNumber.length < 4) 
        {
            this.userSignUp.userNumber = ("0" + this.userSignUp.userNumber)
            console.log(this.userSignUp.userNumber);
        }
        console.log(this.userSignUp);
    }



}

