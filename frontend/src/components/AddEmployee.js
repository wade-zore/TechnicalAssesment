import React, { useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import {
    Card,
    CardHeader,
    CardBody,
    Input,
    Button,
    Typography,
} from "@material-tailwind/react";
import { TrashIcon } from "@heroicons/react/24/outline";

function AddEmployee() {
    /**
     * Initialises the Employee fields
     */
    const [first_name, setFirstName] = useState("")
    const [last_name, setLastName] = useState("")
    const [contact_number, setContactNumber] = useState("")
    const [email, setEmailAddress] = useState("")
    const [date_of_birth, setDateOfBirth] = useState("")
    const [street_address, setStreetAddress] = useState("")
    const [city, setCity] = useState("")
    const [postal_code, setPostalCode] = useState("")
    const [country, setCoutry] = useState("")
    const [skills, setSkill] = useState([{ skill_id: uuidv4(), skill: "", experience: "", seniority_rating: "" }])
    const [errors, setError] = useState({})
    const timerRef = useRef(null);
    const history = useNavigate();

    /**
     * Clear the interval when the component unmounts.
     */
    useEffect(() => {
        return () => clearTimeout(timerRef.current);
    }, []);

    /**
     * Get values from local storage and sets the state is local storage is not empty.
     */
    useEffect(() => {
        if (window.localStorage.length !== 0) {
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
    }, []);

    /**
     * Adds the employee fields to local storage.
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
        window.localStorage.setItem('error', errors);
    }, [first_name, last_name, contact_number, email, date_of_birth, street_address, city, postal_code, country, skills, errors]);


    /**
     * Handles employee fields value change
     * @param {onChange event} e 
     * @returns employee field values 
     */
    const handleFirsNameChange = (e) => setFirstName(e.target.value)
    const handleLastNameChange = (e) => setLastName(e.target.value)
    const handleNumberChange = (e) => setContactNumber(e.target.value)
    const handleEmailChange = (e) => setEmailAddress(e.target.value)
    const handleDOBChange = (e) => setDateOfBirth(e.target.value)
    const handleStreetChange = (e) => setStreetAddress(e.target.value)
    const handleCityChange = (e) => setCity(e.target.value)
    const handleCodeChange = (e) => setPostalCode(e.target.value)
    const handleCountryChange = (e) => setCoutry(e.target.value)
    const handleSkillChange = (id, e) => {
        const newSkills = skills.map(i => {
            if (id === i.skill_id) {
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
        values.splice(values.findIndex(value => value.skill_id === id), 1);
        setSkill(values);
    }

    /**
     * Added another skill bock
     */
    const handleAddFields = () => {
        setSkill([...skills, { skill_id: uuidv4(), skill: "", experience: "", seniority_rating: "" }])
    }



    /**
     * Makes a call to the rest endpoint to save new employee record to database
     * @param {click event} e 
     */
    const saveEmployee = (e) => {
        e.preventDefault()
        let employee = {
            first_name: first_name,
            last_name: last_name,
            contact_number: contact_number,
            email: email,
            date_of_birth: date_of_birth,
            street_address: street_address,
            city: city,
            postal_code: postal_code,
            country: country,
            skills: skills
        }
        console.log(employee)
            fetch("http://localhost:8000/api/employee/", {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(employee)
            })
                .then((resp) => resp.json())
                .then((data) => {
                    console.log(data);
                })
                .catch((err) => {
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
        setSkill([{ skill_id: uuidv4(), skill: "", experience: "", seniority_rating: "" }])
        window.localStorage.clear()
        timerRef.current = setTimeout(() => history('/'), 100);
    }

    return (
        <div className="mx-20">
            <Card className="h-full">
                <CardHeader floated={false} shadow={false} className="rounded-none">
                    <div className="mb-8 flex items-center justify-between gap-8">
                        <div>
                            <Typography variant="h5" color="blue-gray">
                                Create employee
                            </Typography>
                            <Typography color="gray" className="mt-1 font-normal">
                                Please make sure all fields are added
                            </Typography>
                        </div>
                    </div>
                </CardHeader>
                <CardBody className="overflow-scroll px-0">
                    <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96 ml-4">
                        <div className="flex flex-col gap-6">
                            <div className="flex gap-6" >
                                <Input size="lg" label="First name" name="first_name" onChange={handleFirsNameChange}/>
                                <Input size="lg" label="Last name" name="last_name" onChange={handleLastNameChange}/>
                            </div>
                            <Input size="lg" label="Email" name="email" onChange={handleEmailChange} />
                            <Input size="lg" label="Contact number" name="contact" onChange={handleNumberChange}/>
                            <Input size="lg" label="Date of birth" className="w-[15rem]" name="date_of_birth" onChange={handleDOBChange} />
                            
                            <Input size="lg" label="Street Address" className="w-[40rem]" name="street_address" onChange={handleStreetChange}/>
                            

                            <div className="flex gap-2" >
                                <Input size="lg" label="City" onChange={handleCityChange}/>
                                <Input size="lg" label="Courty" onChange={handleCountryChange}/>
                                <Input size="lg" label="Postal code" name="postal_code" onChange={handleCodeChange}/>
                            </div>
                            
                            
                            
                            <label  >
                                        Skills
                            </label>
                            {skills.map((skill) => {
                                return (

                                    <div key={skill.skill_id} >

                                        <div key={skill.skill_id} >
                                            <div className="flex gap-2" >
                                                <Input size="lg" label="Skill" name="skill" onChange={e => handleSkillChange(skill.skill_id, e)}/>
                                                <Input size="lg" label="Years experience" name="experience" onChange={e => handleSkillChange(skill.skill_id, e)}/>
                                                <Input size="lg" label="Seniority rating" name="seniority_rating" onChange={e => handleSkillChange(skill.skill_id, e)}/>
                                                <Button
                                                    variant="outlined"
                                                    className="flex items-center"
                                                    disabled={skills.length === 1}
                                                    onClick={() => handleRemoveFields(skill.skill_id)}
                                                >
                                                    <TrashIcon className="h-5 w-5" />
                                                </Button>



                                            </div>
                                        </div>

                                    </div>

                                );
                            })}

                            <Button className="" fullWidth onClick={handleAddFields}>
                                Add skill
                            </Button>

                        </div>
                        <Button className="mt-9"  onClick={saveEmployee} > 
                            Save
                        </Button>
                        <Button className="mt-9 ml-5"onClick={() => goBack()}>
                            back
                        </Button>
                    </form>
                </CardBody>
            </Card>
        </div>
    );
}

export default AddEmployee;
