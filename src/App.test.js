import { render, screen, within,waitFor} from '@testing-library/react';
import App from './App';
import user from '@testing-library/user-event'
import * as Api from './Api/Api'

describe("Registeration form",()=>{
    
    jest.mock('./Api/Api.js')
    Api.registerUser = jest.fn();

    beforeEach(()=>{
        
        Api.registerUser.mockClear();
        render(<App/>);
    })

    test("form submission on passing of all validations",async()=>{

        user.type(getUserName(),'Hello');
        user.type(getUserEmail(),'avinash@gmail.com');
        user.type(getUserPassword(),'aviansh123');
        user.type(getUserPhone(),'1344234');
        selectOccupation('student');
        user.click(selectGender('male'));
        user.click(selectLanguage('html'));
        user.click(selectLanguage('css'));
        user.click(clickSubmitButton());

        await waitFor(() => {

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
      
        expect(Api.registerUser).toHaveBeenCalledTimes(1);
        
    })

})

function clickSubmitButton(){

    return screen.getByRole('button', { name: /Submit/i })
}

function selectOccupation(occupation){
    
    const dropdown=screen.getByRole('combobox',{name:/occupation/i})
    return user.selectOptions(dropdown,within(dropdown).getByRole('option',{name:occupation}))
}

function selectGender(gender){
    
    return  screen.getByLabelText(gender);
}

function selectLanguage(lang){
    
    return  screen.getByRole('checkbox',{name:lang});
}

function getUserName(){

    return screen.getByRole("textbox",{name:/username/i});
}

function getUserEmail(){
    return screen.getByRole("textbox",{name:/email/i});
}

function getUserPassword(){
    return screen.getByLabelText(/password/i);;
}

function getUserPhone(){
    return screen.getByRole("textbox",{name:/phone/i});
}




