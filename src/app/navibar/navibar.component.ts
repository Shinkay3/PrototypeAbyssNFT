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
    user: User = new User();
    newUser: User = new User();
    showMe: boolean = false;
    signUpErrors: string[] = [];
    loginErrors: string[] = [];
    passwordRepeat:string;
    errorTeller: number;
    token:string;
    isLoggedIn:boolean=false;
    activeModal:NgbModal;
    showOption:boolean = false;
    manageDropdown : boolean = false;



    @ViewChild('success', {read: TemplateRef}) successModal: TemplateRef<any>;


    constructor(private nbService: NavbarService, private modalService: NgbModal, private loginService: LoginService, private signupService: SignupService) 
    {
        this.newUser.userName = "";
        this.newUser.email = "";
        this.newUser.password = "";
        this.newUser.userNumber = "";
    }

    //Check for authorization token (jwt) on init.
    async ngOnInit() 
    {
        this.loginService.removeToken();
        if(this.loginService.getToken())
        {
            this.user = await this.loginService.loginAuthToken();
            if(this.user != null)
            {
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
        uNameExist = await this.signupService.checkUserName(this.newUser.userName,this.newUser.userNumber);
        
        var uEmailExist;
        uEmailExist = await this.signupService.checkEmail(this.newUser.email);

        if(uNameExist)
            this.signUpErrors.push("Username with usernumber already in use")

        if(uEmailExist)
            this.signUpErrors.push("Email is already in use")

        if(this.newUser.password != "" && this.newUser.password != this.passwordRepeat)
            this.signUpErrors.push("Passwords do not match");

        if(this.newUser.userName != null)
            if(this.newUser.userName != "" && this.newUser.userName.length < 3)
                this.signUpErrors.push("Username must be at least 3 characters long") 

        console.log(this.signUpErrors);
    }

    //Check if fields are empty in newUser
    checkForEmpty()
    {
        for(var b in this.newUser)
        {
            if(this.newUser[b] == [] || this.newUser[b] == "")
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
        while (this.newUser.userNumber.length < 4)
        {
            this.newUser.userNumber = "0" + this.newUser.userNumber;
        }
    }

    public async createUser() 
    {     
        await this.checkForErrors(); 
        this.checkForEmpty();

        if(this.signUpErrors.length == 0)
        {
            await this.signupService.createUser(this.newUser).then(
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
        console.log(this.user.userName);
        await this.loginService.login(this.user.userName,this.user.password).then(
            response => this.loginService.setToken(response),
            error => this.loginErrors.push(error.error)
        )
        if(this.loginService.getToken())
        {
            this.user = await this.loginService.loginAuthToken();
            console.log(this.user);
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
        this.showMe = !this.showMe;
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
        this.newUser.userNumber = randNumber.toString();
        while (this.newUser.userNumber.length < 4) 
        {
            this.newUser.userNumber = ("0" + this.newUser.userNumber)
            console.log(this.newUser.userNumber);
        }
        console.log(this.newUser);
    }



}

