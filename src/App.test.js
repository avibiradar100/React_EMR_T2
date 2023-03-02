import { render, screen } from '@testing-library/react';
import App from './App';
import user from '@testing-library/user-event'

describe("Registeration form",()=>{
    render(<App/>);

    test("form submission on passing of all validations",()=>{

        user.type(getUserName(),'Hello');
        user.type(getUserEmail(),'avinash@gmail.com');
        user.type(getUserPassword(),'aviansh123');
        user.type(getUserCPassword(),'1344234');
        
    })
})


function getUserName(){

    return screen.getByRole("textbox",{name:/username/i});
}

function getUserEmail(){
    return screen.getByRole("textbox",{name:/email/i});
}

function getUserPassword(){
    return screen.getByRole("textbox",{name:/password/i});
}

function getUserCPassword(){
    return screen.getByRole("textbox",{name:/cpassword/i});
}

