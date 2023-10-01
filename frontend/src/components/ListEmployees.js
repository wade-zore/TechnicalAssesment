import React, { useRef } from "react";
import {useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import {
    MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { PencilIcon, UserPlusIcon,EyeIcon } from "@heroicons/react/24/solid";
import {
    Card,
    CardHeader,
    Input,
    Typography,
    Button,
    CardBody,
    IconButton,
    Tooltip,
} from "@material-tailwind/react";

const TABLE_HEAD = ["Employee", "Contact Number", "Employed", ""," "];

function ListEmployees(){

    /**
     * initialize the list of employees and search keyword
     */
    const [employees, setEmployees] = useState([])
    const [searchKeyword,setsearchKeyword] = useState("")
    const history = useNavigate();
    const componentMounted = useRef(true);


    /**
     * sets search keyword typed by user.
     * @param {change event} e 
     * @returns search keyword
     */
    const handleSearchChange = (e) => {
        setsearchKeyword({key:e.target.value})
        searchEmployee()
        return employees
    
    }

    /**
     * makes call to the rest endpoint and find employee record based on search keyword.
     * @returns employee object.
     */
    const searchEmployee = async () =>{
        console.log("http://localhost:8000/employee/?search="+searchKeyword.key)
        fetch("http://localhost:8000/employee/?search="+searchKeyword.key,{
                method:  'GET',
                mode: 'cors',
            })
            .then((resp) => resp.json())
            .then((data) => {
                
                setEmployees(data)
            
                
            })
            .catch((err) =>{
                console.log(err)
        })
    }
    
    useEffect(()=>{
        const getList = async ()=>{
            const getListFromServer =await fetchList()
            setEmployees(getListFromServer)
        }
        getList()
        return () => { // This code runs when component is unmounted
            componentMounted.current = false; // (4) set it to false when we leave the page
        }
    }, [employees])

    /**
     * Make a call to the rest endpoint to get list of employee record from database
     * @returns List of employees
     */
    const fetchList = async ()=>{
        const res =await fetch('http://localhost:8000/employee/')
        const data = await res.json()
        return data
    }

    /**
     * Redirect to AddEmployee component
     */
    const addEmployee = ()=>{
        history('/addEmployee')
    }

    /**
     * Redirect to EditEmployee compenonets and passes employee object that needs to be edited
     * @param {} employee 
     */
    const editEmployee = (employee) => {
        history ('/editEmployee',{state:{employee}})
    }

    /**
     * Redirects to the ViewEmployee comonent and passes employee object that needs to be viewed
     * @param {*} employee 
     */
    const viewEmployee = (employee) => {
        history ('/viewEmployee',{state:{employee}})
    }


    return(
        
        <div className="flex flex-col">
            <div className="lg:flex items-center justify-center">
                <div className="flex-1 min-w-0">
                    <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate text-center">Employee Management Systems</h2>
                </div>
            </div>
            <div className="mx-20">
                <Card className="h-full">
                    <CardHeader floated={false} shadow={false} className="rounded-none">
                        <div className="mb-8 flex items-center justify-between gap-8">
                        <div>
                            <Typography variant="h5" color="blue-gray">
                            Employee list
                            </Typography>
                            <Typography color="gray" className="mt-1 font-normal">
                            See information about all employees
                            </Typography>
                        </div>
                        <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                            <Button className="flex items-center gap-3" size="sm" onClick={addEmployee}>
                                <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> 
                                Add employee
                            </Button>
                        </div>
                        </div>
                        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                        <div className="w-full md:w-72">
                            <Input
                            label="Search"
                            icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                            value={searchKeyword.key}
                            onChange={handleSearchChange}
                            />
                        </div>
                        </div>
                    </CardHeader>
                    <CardBody className="overflow-scroll px-0">
                        <table className="mt-4 w-full min-w-max table-auto text-left">
                        <thead>
                        <tr>
                            {TABLE_HEAD.map((head) => (
                                <th
                                key={head}
                                className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                                >
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-normal leading-none opacity-70"
                                >
                                    {head}
                                </Typography>
                                </th>
                            ))}
                        </tr>
                        </thead>
                        <tbody>
                            {employees.map(
                            (person, index) => {
                                const isLast = index === employees.length - 1;
                                const classes = isLast
                                ? "p-4"
                                : "p-4 border-b border-blue-gray-50";
                
                                return (
                                <tr key={index}>
                                    <td className={classes}>
                                    <div className="flex items-center gap-3">
                                
                                        <div className="flex flex-col">
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal"
                                        >
                                            {person.first_name + " "+ person.last_name}
                                        </Typography>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal opacity-70"
                                        >
                                            {person.email}
                                        </Typography>
                                        </div>
                                    </div>
                                    </td>
                                    <td className={classes}>
                                    <div className="flex flex-col">
                                        <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal"
                                        >
                                        {person.contact_number}
                                        </Typography>
                                    </div>
                                    </td>
                
                                    <td className={classes}>
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal"
                                    >
                                        {person.date_of_birth}
                                    </Typography>
                                    </td>
                                    <td className={classes}>
                                    <Tooltip content="Edit User">
                                        <IconButton variant="text" onClick={()=> editEmployee(person) }>
                                            <PencilIcon className="h-4 w-4" />
                                        </IconButton>
                                    </Tooltip>
                                    </td>
                                    <td className={classes}>
                                    <Tooltip content="Edit User">
                                        <IconButton variant="text" onClick={()=> viewEmployee(person) }>
                                            <EyeIcon className="h-4 w-4" />
                                        </IconButton>
                                    </Tooltip>
                                    </td>
                                </tr>
                                );
                            },
                            )}
                        </tbody>
                        </table>
                    </CardBody>
            
                </Card>
            </div>
        </div>
    )
}

export default ListEmployees;