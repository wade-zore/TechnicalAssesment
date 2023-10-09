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

function EditEmployee(props) {

    /**
     * Initalises employee form fields
     */
    const employee = useLocation();
    const [id,setID] = useState(employee.state.employee.id)
    const [employee_id,setEmployeeId] = useState(employee.state.employee.employee_id)
    const [first_name,setFirstName] = useState("")
    const [last_name,setLastName] = useState("")
    const [contact_number,setContactNumber] = useState("")
    const [email,setEmailAddress] = useState("")
    const [date_of_birth,setDateOfBirth] = useState("")
    const [street_address,setStreetAddress] = useState("")
    const [city,setCity] = useState("")
    const [postal_code,setPostalCode] = useState("")
    const [country,setCoutry] = useState("")
    const [skills,setSkill] = useState([{skill_id: uuidv4(),skill:"",experience:"",seniority_rating:""}])
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
            if(id === i.skill_id){
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
        values.splice(values.findIndex(value => value.skill_id === id),1);
        setSkill(values);
    }

    /**
     * Added another skill bock
     */
    const handleAddFields = () => {
        setSkill([...skills, {skill_id: uuidv4(),skill:"",experience:"",seniority_rating:""}])
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
                            Edit {id}
                        </Typography>
                        <Typography color="gray" className="mt-1 font-normal">
                            Edit or Delete record for {first_name+" "+last_name}
                        </Typography>
                    </div>
                </div>
            </CardHeader>
            <CardBody className="overflow-scroll px-0">
                <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96 ml-4">
                    <div className="flex flex-col gap-6">
                        <div className="flex gap-6" >
                            <Input size="lg" label="First name" name="first_name" value={first_name} onChange={handleFirsNameChange}/>
                            <Input size="lg" label="Last name" name="last_name" value={last_name} onChange={handleLastNameChange}/>
                        </div>
                        <Input size="lg" label="Email" name="email" value={email} onChange={handleEmailChange} />
                        <Input size="lg" label="Contact number" value={contact_number} name="contact_number" onChange={handleNumberChange}/>
                        <Input size="lg" label="Date of birth" value={date_of_birth} name="date_of_birth" onChange={handleDOBChange} />
                        
                        <Input size="lg" label="Street Address" className="w-[40rem]" value={street_address} name="street_address" onChange={handleStreetChange}/>
                        

                        <div className="flex gap-2" >
                            <Input size="lg" label="City" value={city} onChange={handleCityChange}/>
                            <Input size="lg" label="Courty" value={country} onChange={handleCountryChange}/>
                            <Input size="lg" label="Postal code" value={postal_code} name="postal_code" onChange={handleCodeChange}/>
                        </div>
                        
                        
                        
                        <label  >
                                    Skills
                        </label>
                        {skills.map((skill) => {
                            return (

                                <div key={skill.skill_id} >

                                    <div key={skill.skill_id} >
                                        <div className="flex gap-2" >
                                            <Input size="lg" label="Skill" name="skill" value={skill.skill} onChange={e => handleSkillChange(skill.skill_id, e)}/>
                                            <Input size="lg" label="Years experience" name="experience" value={skill.experience} onChange={e => handleSkillChange(skill.skill_id, e)}/>
                                            <Input size="lg" label="Seniority rating" value={skill.seniority_rating} name="seniority_rating" onChange={e => handleSkillChange(skill.skill_id, e)}/>
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
                    <Button className="mt-9" onClick={() => sendRequest("PATCH")}> 
                        Save
                    </Button>
                    <Button className="mt-9 ml-5" onClick={() => sendRequest("DELETE")}> 
                        Delete
                    </Button>
                    <Button className="mt-9 ml-5"onClick={() => goBack()}>
                        back
                    </Button>
                </form>
            </CardBody>
        </Card>
    </div>
        // <div className="mt-10 sm:mt-0">
        //     <div className="md:grid md:grid-cols-3 md:gap-6">
        //         <div className="mt-5 md:mt-0 md:col-span-2">
        //             <form action="#" method="POST">
        //                 <div className="shadow overflow-hidden sm:rounded-md">
        //                     <div className="px-4 py-5 bg-white sm:p-6">
        //                         <div className="grid grid-cols-6 gap-6">

        //                         <div className="col-span-6 sm:col-span-6">
        //                                 <label htmlFor="employeeID" className="block text-sm font-medium text-gray-700">
        //                                     Employee ID
        //                                 </label>
        //                                 <label htmlFor="employeeID" className="block text-sm font-medium text-sky-500">
        //                                    {id}
        //                                 </label>
        //                             </div>

        //                             <div className="col-span-6 sm:col-span-3">
        //                                 <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
        //                                     First name
        //                                 </label>
        //                                 <input
        //                                     type="text"
        //                                     name="firstName"
        //                                     id="firstName"
        //                                     placeholder="First Name"
        //                                     value={first_name}
        //                                     onChange={handleFirsNameChange}
        //                                     className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        //                                 />
        //                                 <span>{errors["firstName"]}</span>
        //                             </div>

        //                             <div className="col-span-6 sm:col-span-3">
        //                                 <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
        //                                     Last name
        //                                 </label>
        //                                 <input
        //                                     type="text"
        //                                     name="lastName"
        //                                     id="lastName"
        //                                     placeholder="Last Name"
        //                                     value={last_name}
        //                                     onChange={handleLastNameChange}
        //                                     className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        //                                 />
        //                                 <span>{errors["lastName"]}</span>
        //                             </div>

        //                             <div className="col-span-6 sm:col-span-3">
        //                                 <label htmlFor="contactNumber" className="block text-sm font-medium text-gray-700">
        //                                    Contact Number
        //                                 </label>
        //                                 <input
        //                                     type="text"
        //                                     name="contactNumber"
        //                                     id="contactNumber"
        //                                     placeholder="Contact Number"
        //                                     value={contact_number}
        //                                     onChange={handleNumberChange}
        //                                     className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        //                                 />
        //                                 <span>{errors["contactNumber"]}</span>
        //                             </div>
        //                             <div className="col-span-6 sm:col-span-3">
        //                                 <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
        //                                     Email address
        //                                 </label>
        //                                 <input
        //                                     type="text"
        //                                     name="emailAddress"
        //                                     id="emailAddress"
        //                                     placeholder="Email Address"
        //                                     value={email}
        //                                     onChange={handleEmailChange}
        //                                     className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        //                                 />
        //                                 <span>{errors["emailAddress"]}</span>
        //                             </div>

        //                             <div className="col-span-6 sm:col-span-1">
        //                                 <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700">
        //                                     Date Of Birth
        //                                 </label>
        //                                 <input
        //                                     type="text"
        //                                     name="dateOfBirth"
        //                                     id="dateOfBirth"
        //                                     placeholder="DD/MM/YYYY"
        //                                     value={date_of_birth}
        //                                     onChange={handleDOBChange}
        //                                     className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        //                                 />
        //                                 <span>{errors["dateOfBirth"]}</span>
        //                             </div>

                                    

        //                             <div className="col-span-6">
        //                                 <label htmlFor="street-address" className="block text-sm font-medium text-gray-700">
        //                                     Street address
        //                                 </label>
        //                                 <input
        //                                     type="text"
        //                                     name="streetAddress"
        //                                     id="streetAddress"
        //                                     placeholder="Street Address"
        //                                     value={street_address}
        //                                     onChange={handleStreetChange}
        //                                     className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        //                                 />
        //                                 <span>{errors["streetAddress"]}</span>
        //                             </div>

        //                             <div className="col-span-6 sm:col-span-6 lg:col-span-2">
        //                                 <label htmlFor="city" className="block text-sm font-medium text-gray-700">
        //                                     City
        //                                 </label>
        //                                 <input
        //                                     type="text"
        //                                     name="city"
        //                                     id="city"
        //                                     placeholder="City"
        //                                     value={city}
        //                                     onChange={handleCityChange}
        //                                     className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        //                                 />
        //                                 <span>{errors["city"]}</span>
        //                             </div>

        //                             <div className="col-span-6 sm:col-span-3 lg:col-span-2">
        //                                 <label htmlFor="postal-code" className="block text-sm font-medium text-gray-700">
        //                                     ZIP / Postal code
        //                                 </label>
        //                                 <input
        //                                     type="text"
        //                                     name="postalCode"
        //                                     id="postalCode"
        //                                     placeholder="Postal Code"
        //                                     value={postal_code}
        //                                     onChange={handleCodeChange}
        //                                     className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        //                                 />
        //                                 <span>{errors["postalCode"]}</span>
        //                             </div>

        //                             <div className="col-span-6 sm:col-span-2">
        //                                 <label htmlFor="country" className="block text-sm font-medium text-gray-700">
        //                                     Country
        //                                 </label>
        //                                 <input
        //                                     id="country"
        //                                     name="country"
        //                                     placeholder="Country"
        //                                     value={country}
        //                                     onChange={handleCountryChange}
        //                                     className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        //                                 />
        //                                 <span>{errors["country"]}</span>
        //                             </div>
        //                             <div className="grid grid-cols-11 gap-20 ">
        //                             <label  >
        //                                 Skills
        //                             </label>
        //                             </div>
                                    
        //                             { skills.map((skill) => {
        //                                 return (
                                            
        //                             <div key = {skill.skillNum} >
                                    
        //                                 <div className="col-span-6 sm:col-span-6 lg:col-span-4">
        //                                     <label htmlFor="skill" className="block text-sm font-medium text-gray-700" >
        //                                         Skill
        //                                     </label>
        //                                     <input
        //                                         type="text"
        //                                         name="skill"
        //                                         id="skill"
        //                                         placeholder="Skill"
        //                                         value={skill.skill}
        //                                         onChange={e => handleSkillChange(skill.skillNum, e)}
        //                                         className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        //                                     />
        //                                     <span>{errors["skill"]}</span>
        //                                 </div>
        //                                 <div className="col-span-6 sm:col-span-6 lg:col-span-3">
        //                                     <label htmlFor="yrsExp" className="block text-sm font-medium text-gray-700">
        //                                         yrsExp
        //                                     </label>
        //                                     <input
        //                                         type="text"
        //                                         name="yrsExp"
        //                                         id="yrsExp"
        //                                         placeholder="Years Experience"
        //                                         value={skill.experience}
        //                                         onChange={e => handleSkillChange(skill.skillNum, e)}
        //                                         className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        //                                     />
        //                                     <span>{errors["yrsExp"]}</span>
        //                                 </div>
        //                                 <div className="col-span-4 sm:col-span-6 lg:col-span-4">
        //                                     <label htmlFor="seniorityRating" className="block text-sm font-medium text-gray-700">
        //                                         Seniority Rating
        //                                     </label>
        //                                     <input
        //                                         type="text"
        //                                         name="seniorityRating"
        //                                         id="seniorityRating"
        //                                         placeholder="e.g. Junior"
        //                                         value={skill.seniority_rating}
        //                                         onChange={e => handleSkillChange(skill.skillNum, e)}
        //                                         className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        //                                     />
        //                                     <span>{errors["seniorityRating"]}</span>
        //                                 </div>
        //                                 <div className="py-2">
        //                                     <span className="relative z-0 inline-flex shadow-sm rounded-md ">
        //                                         <button
        //                                             type="button"
        //                                             onClick={handleAddFields}
        //                                             className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        //                                         >
        //                                             Add
        //                                         </button>
        //                                         <button
        //                                                 type="button"
        //                                                 disabled={skills.length === 1} 
        //                                                 onClick={() => handleRemoveFields(skill.skillNum)}
        //                                                 className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        //                                         >
        //                                             Remove
        //                                         </button>
        //                                     </span>
        //                                 </div>
        //                             </div>
        //                                 );
        //                             })}
        //                         </div>
                                
        //                     </div>
        //                     <div className="px-4 py-3 bg-gray-50 sm:px-4">
        //                         <button
        //                             type="submit"
        //                             onClick={(e) => sendRequest("update")}
        //                             className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        //                         >
        //                             Save
        //                         </button>
        //                         <button
        //                             type="submit"
        //                             onClick={(e) => sendRequest("delete")}
        //                             className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        //                         >
        //                             Delete
        //                         </button>
        //                         <button
        //                             type="submit"
        //                             onClick={goBack}
        //                             className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        //                         >
        //                             Cancel
        //                         </button>
        //                     </div>
        //                 </div>
        //             </form>
        //         </div>
        //     </div>
        // </div>

  );
}

export default EditEmployee;
