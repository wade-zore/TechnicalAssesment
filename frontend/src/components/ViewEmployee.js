import React, {  useState ,useEffect} from "react";
import { v4 as uuidv4 } from 'uuid';
import { useNavigate, useLocation } from 'react-router-dom';
import {
    Card,
    CardHeader,
    CardBody,
    Input,
    Button,
    Typography,
} from "@material-tailwind/react";
import { TrashIcon } from "@heroicons/react/24/outline";

function ViewEmployee(props) {

    /**
     * Initalises employee form fields
     */
    const employee = useLocation();
    const [id,setID] = useState(employee.state.employee.id)
    const [first_name,setFirstName] = useState("")
    const [last_name,setLastName] = useState("")
    const [contact_number,setContactNumber] = useState("")
    const [email,setEmailAddress] = useState("")
    const [date_of_birth,setDateOfBirth] = useState("")
    const [street_address,setStreetAddress] = useState("")
    const [city,setCity] = useState("")
    const [postal_code,setPostalCode] = useState("")
    const [country,setCoutry] = useState("")
    const [skills,setSkill] = useState([{id: uuidv4(),skill:"",experience:"",seniority_rating:""}])
    const [errors,setError] = useState({})
    const history = useNavigate();

    /**
     * Sets the state of employee fields.
     * If there are values in local storage, state is set using those values.
     * if there are no values in the local storage, state is set to the values of employee object passed into component.
     */
    useEffect(() => {
        let l = ["first_name","last_name","contact_number","email","date_of_birth","street_address","city","postal_code","country"]
        let exist = true;
        l.forEach(field =>{
            if(!window.localStorage.getItem(field)){
                exist = false
            }
        })

        if(!exist){
            setFirstName(employee.state.employee.first_name)
            setLastName(employee.state.employee.last_name)
            setContactNumber(employee.state.employee.contact_number)
            setEmailAddress(employee.state.employee.email)
            setDateOfBirth(employee.state.employee.date_of_birth)
            setStreetAddress(employee.state.employee.street_address)
            setCity(employee.state.employee.city)
            setPostalCode(employee.state.employee.postal_code)
            setCoutry(employee.state.employee.country)
            setSkill(employee.state.employee.skills)
        } else{
            
            setFirstName(window.localStorage.getItem('first_name'));
            setLastName(window.localStorage.getItem('last_name'));
            setContactNumber(window.localStorage.getItem('contact_number'));
            setEmailAddress(window.localStorage.getItem('email'));
            setDateOfBirth(window.localStorage.getItem('date_of_birth'));
            setStreetAddress(window.localStorage.getItem('street_address'));
            setCity(window.localStorage.getItem('city'));
            setPostalCode(window.localStorage.getItem('postal_code'));
            setCoutry(window.localStorage.getItem('country'));
            setSkill(JSON.parse(window.localStorage.getItem('skills')));
            setError(window.localStorage.getItem('error'));
           
        }
      }, [employee.state.employee.first_name,
        employee.state.employee.last_name,
        employee.state.employee.contact_number,
        employee.state.employee.email,
        employee.state.employee.date_of_birth,
        employee.state.employee.street_address,
        employee.state.employee.city,
        employee.state.employee.postal_code,
        employee.state.employee.country,
        employee.state.employee.skills]);


    /**
     * Addeds the employee field to local storage
     */
    useEffect(() => {
        window.localStorage.setItem('first_name', first_name);
        window.localStorage.setItem('last_name', last_name);
        window.localStorage.setItem('contact_number', contact_number);
        window.localStorage.setItem('email', email);
        window.localStorage.setItem('date_of_birth', date_of_birth);
        window.localStorage.setItem('street_address', street_address);
        window.localStorage.setItem('city', city);
        window.localStorage.setItem('postal_code', postal_code);
        window.localStorage.setItem('country', country);
        window.localStorage.setItem('skills', JSON.stringify(skills));
        window.localStorage.setItem('error',errors);
    }, [first_name,last_name,contact_number,email,date_of_birth,street_address,city,postal_code,country,skills,errors]);
    
    /**
     * Handle form field changes
     * @param {onChange event} e 
     * @returns From field
     */
    const handleFirsNameChange = (e) => setFirstName(e.target.value)
    const handleLastNameChange = (e) => setLastName(e.target.value)
    const handleNumberChange = (e) => setContactNumber(e.target.value)
    const handleEmailChange =(e) => setEmailAddress(e.target.value)
    const handleDOBChange = (e) => setDateOfBirth(e.target.value)
    const handleStreetChange = (e) => setStreetAddress(e.target.value)
    const handleCityChange = (e) => setCity(e.target.value)
    const handleCodeChange = (e) => setPostalCode(e.target.value)
    const handleCountryChange = (e) => setCoutry(e.target.value)
    const handleSkillChange = (id,e) => {
        const newSkills = skills.map(i =>{
            if(id === i.skillNum){
                i[e.target.name] = e.target.value
            }
            return i;
        })
        setSkill(newSkills);
    }

    /**
     * Removes Skill block
     * @param {skills block id} id 
     */
    const handleRemoveFields = id => {
        const values = [...skills];
        values.splice(values.findIndex(value => value.skillNum === id),1);
        setSkill(values);
    }

    /**
     * Added another skill bock
     */
    const handleAddFields = () => {
        setSkill([...skills, {skillNum: uuidv4(),skill:"",experience:"",seniority_rating:""}])
    }

    /**
     * Makes a call to rest endpoint to either 
     * 1. Edit employee record or,
     * 2. Delete employee Record
     * @param {update / delete} requestType 
     */
    const sendRequest = (requestType) => {
        let employee = {
            id: id,
            first_name: first_name,
            last_name: last_name,
            contact_number: contact_number,
            email: email,
            date_of_birth: date_of_birth,
            street_address: street_address,
            city: city,
            postalCode: postal_code,
            country: country,
            skills:skills
        }
        
        fetch("http://localhost:8000/employee/"+employee.id+"/",{
                method:  requestType,
                mode: 'cors',
                headers: {
                    'Content-type' : 'application/json'
                },
                body: JSON.stringify(employee)
            })
            .then((resp) => resp.json())
            .then((data) => {
                console.log(data);
            })
            .catch((err) =>{
                console.log(err)
        })
        goBack()

    }

    /**
     * Redirects to the ListEmployee component and clears the employee fields state.
     */
    const goBack = () => {
        setFirstName("")
        setLastName("")
        setContactNumber("")
        setEmailAddress("")
        setDateOfBirth("")
        setStreetAddress("")
        setCity("")
        setPostalCode("")
        setCoutry("")
        setSkill([{ID: uuidv4(),skill:"",experience:"",seniority_rating:""}])
        window.localStorage.clear()
        history('/')
    } 

  return (
    <div className="mx-20">
        <Card className="h-full">
            <CardHeader floated={false} shadow={false} className="rounded-none">
                <div className="mb-8 flex items-center justify-between gap-8">
                    <div>
                        <Typography variant="h5" color="blue-gray">
                            Details for: {id}
                        </Typography>
                        <Typography color="gray" className="mt-1 font-normal">
                            View all details for {first_name+" "+last_name}
                        </Typography>
                    </div>
                </div>
            </CardHeader>
            <CardBody className="overflow-scroll px-0">
                <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96 ml-4">
                    <div className="flex flex-col gap-6">
                        <div className="flex gap-6" >
                            <Input size="lg" label="First name" name="first_name" value={first_name} disabled/>
                            <Input size="lg" label="Last name" name="last_name" value={last_name} disabled/>
                        </div>
                        <Input size="lg" label="Email" name="email" value={email} disabled/>
                        <Input size="lg" label="Contact number" value={contact_number} name="contact_number" disabled/>
                        <Input size="lg" label="Date of birth" value={date_of_birth} name="date_of_birth" disabled />
                        
                        <Input size="lg" label="Street Address" className="w-[40rem]" value={street_address} name="street_address" disabled/>
                        

                        <div className="flex gap-2" >
                            <Input size="lg" label="City" value={city} disabled/>
                            <Input size="lg" label="Courty" value={country} disabled/>
                            <Input size="lg" label="Postal code" value={postal_code} name="postal_code" disabled/>
                        </div>
                        
                        
                        
                        <label  >
                                    Skills
                        </label>
                        {skills.map((skill) => {
                            return (

                                <div key={skill.skillNum} >

                                    <div key={skill.skillNum} >
                                        <div className="flex gap-2" >
                                            <Input size="lg" label="Skill" name="skill" value={skill.skill} disabled/>
                                            <Input size="lg" label="Years experience" name="experience" value={skill.experience} disabled/>
                                            <Input size="lg" label="Seniority rating" value={skill.seniority_rating} name="seniority_rating" disabled/>



                                        </div>
                                    </div>

                                </div>

                            );
                        })}

                    </div>
                    <Button className="mt-9"onClick={() => goBack()}>
                        back
                    </Button>
                </form>
            </CardBody>
        </Card>
    </div>

  );
}

export default ViewEmployee;
