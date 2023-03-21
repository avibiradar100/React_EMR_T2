import { render, screen, within,waitFor} from '@testing-library/react';
import App from './App';
import user from '@testing-library/user-event'
import * as Api from './Api/Api'

// mocking function registerUser from ./Api/Api.js
jest.mock('./Api/Api.js')

// test suite for registeration form
describe("Registeration form",()=>{
    
    // runs before the every test case
    beforeEach(()=>{
        // rendering of component
        render(<App/>);
    })

    // testing when input data passed the all validations
    test("form should be submitted on all correct inputs ",async()=>{
        // selecting element field through fns return below and providing input for that by using userevent from testing library react
        user.type(getUserName(),'Hello');
        user.type(getUserEmail(),'avinash@gmail.com');
        user.type(getUserPassword(),'aviansh123');
        user.type(getUserPhone(),'1344234');
        selectOccupation('student');
        user.click(selectGender('male'));
        user.click(selectLanguage('html'));
        user.click(selectLanguage('css'));
        user.click(SubmitButton());

        await waitFor(() => {
            
            // checkking is function call with this data aor not as we provided that 
            expect(Api.registerUser).toHaveBeenCalledWith(
                {
                    "email":"avinash@gmail.com",
                    "gender": "male", 
                    "languages": ["html", "css"], 
                    "occupation": "student", 
                    "password": "aviansh123", 
                    "phone": "1344234", 
                    "username": "Hello"
                }
            );
        });
        
        // as we have mocked the registerUser function checking no of times we called it 
        expect(Api.registerUser).toHaveBeenCalledTimes(1);
        
    })

    // testing when all validations failed
    test("should give alert for incorrect inputs",async()=>{

        // selecting element field through fns return below and providing input for that by using userevent from testing library react
        user.type(getUserName(),'');
        user.type(getUserEmail(),'avinashgmail.com');
        user.type(getUserPassword(),'avi13');
        user.type(getUserPhone(),'1344234');
        selectOccupation('');
        user.click(selectGender(''));
        // user.click(selectLanguage(''));
        // user.click(selectLanguage(''));
        user.click(SubmitButton());

        await waitFor(() => {

            expect(screen.getByText('please Enter username!')).toBeInTheDocument();
            expect(screen.getByText('Email is Invalid!')).toBeInTheDocument();
            expect(screen.getByText('Phone no is incorrect')).toBeInTheDocument();
            expect(screen.getByText('Password should greater than 6 characters!')).toBeInTheDocument();
            expect(screen.getByText('please Provide Occupation!')).toBeInTheDocument();
            expect(screen.getByText('please Select Gender!')).toBeInTheDocument();
            expect(screen.getByText('Any one language required!')).toBeInTheDocument();
        });
        
        // as we have mocked the registerUser function checking no of times we called it 
        expect(Api.registerUser).toHaveBeenCalledTimes(1);
        
    })




})

// fn to select submitButton
function SubmitButton(){
    return screen.getByRole('button', { name: /Submit/i })
}

// fn to select occupation
function selectOccupation(occupation){
    const dropdown=screen.getByRole('combobox',{name:/occupation/i})
    return user.selectOptions(dropdown,within(dropdown).getByRole('option',{name:occupation}))
}

// fn to select gender
function selectGender(gender){
    return  screen.getByLabelText(gender);
}

// fn to select language
function selectLanguage(lang){
    return  screen.getByRole('checkbox',{name:lang});
}

// fn to select username
function getUserName(){
    return screen.getByRole("textbox",{name:/username/i});
}

// fn to select useremail
function getUserEmail(){
    return screen.getByRole("textbox",{name:/email/i});
}

// fn to select userpassword
function getUserPassword(){
    return screen.getByLabelText(/password/i);;
}

// fn to select userphone
function getUserPhone(){
    return screen.getByRole("textbox",{name:/phone/i});
}




