import React, { useEffect, useState } from 'react';
import {
    MagnifyingGlassIcon,
    ChevronUpDownIcon,
    EyeIcon,
} from "@heroicons/react/24/outline";
import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import {
    Card,
    CardHeader,
    Input,
    Typography,
    Button,
    CardBody,
    Chip,
    CardFooter,
    Tabs,
    TabsHeader,
    Tab,
    Avatar,
    IconButton,
    Tooltip,
} from "@material-tailwind/react";

const ProviderOrderStatus = () => {
    const TABS = [
        {
            label: "All",
            value: "all",
        },
        {
            label: "Waiting for confirmation",
            value: "WAIT",
        },
        {
            label: "On going",
            value: "onGoing",
        },
        {
            label: "Done",
            value: "done",
        },
        {
            label: "Cancel",
            value: "cancel",
        },
    ];

    const TABLE_HEAD = ["Id", "Customer", "Phone", "Date order", "Date complete", "Total price", "Status", ""];

    const TABLE_ROWS = [



    ];
    const [tableRows, setTableRows] = useState(TABLE_ROWS);
    const [selectedTab, setSelectedTab] = useState("all");
    const [searchValue, setSearchValue] = useState("");
    useEffect(() => {
        fetch('https://64b1e204062767bc4826ae59.mockapi.io/da/Nhasx')
            .then(response => response.json())
            .then(data => {
                const rowsWithDefaultStatus = data.map(row => ({ ...row, status: "WAIT" }));
                setTableRows(rowsWithDefaultStatus);
            })
            .catch(error => console.error(error));
    }, []);
    

    const filteredRows = tableRows.filter((row) => {
        if (selectedTab === "WAIT") {
            return true;
        } else {
            return row.status.toLowerCase() === selectedTab.toLowerCase();
        }
    }).filter((row) => {
        if (searchValue.trim() === "") {
            return true;
        } else {
            const customerName = row.customer.toLowerCase();
            const searchInput = searchValue.toLowerCase();
            return customerName.includes(searchInput);
        }
    });




    const handleTabChange = (value) => {
        setSelectedTab(value);
    };

    const handleSearchChange = (event) => {
        setSearchValue(event.target.value);
    };

    // const filteredRows = TABLE_ROWS.filter((row) => {
    //     if (selectedTab === "waiting for confirming") {
    //         return row.status === "Waiting for confirming";
    //     } else if (selectedTab === "onGoing") {
    //         return row.status === "On going";
    //     } else if (selectedTab === "done") {
    //         return row.status === "Done";
    //     } else if (selectedTab === "cancel") {
    //         return row.status === "Cancel";
    //     } else {
    //         return true; // Show all rows for "all" tab
    //     }
    // }).filter((row) => {
    //     if (searchValue.trim() === "") {
    //         return true; // Show all rows if search value is empty
    //     } else {
    //         const customerName = row.customer.toLowerCase();
    //         const searchInput = searchValue.toLowerCase();
    //         return customerName.includes(searchInput);
    //     }
    // });



    const handleStatusChange = (event, id) => {
        const updatedRows = tableRows.map(row => {
            if (row.id === id) {
                return {
                    ...row,
                    status: event.target.value
                };
            }
            return row;
        });

        setTableRows(updatedRows);
    };

    return (
        <>

            <Card className="h-full w-full">
                <CardHeader floated={false} shadow={false} className="rounded-none">
                    <div className="mb-8 text-center">
                        <div>
                            <Typography variant="h2" color="blue-gray">
                                Order
                            </Typography>
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                        <Tabs value={selectedTab} className="w-full md:w-max">
                            <TabsHeader>
                                {TABS.map(({ label, value }) => (
                                    <Tab
                                        key={value}
                                        value={value}
                                        className="w-fit"
                                        onClick={() => handleTabChange(value)}
                                    >
                                        &nbsp;&nbsp;{label}&nbsp;&nbsp;
                                    </Tab>
                                ))}
                            </TabsHeader>
                        </Tabs>
                        <div className="w-full md:w-72">
                            <Input
                                label="Search by name"
                                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                                value={searchValue}
                                onChange={handleSearchChange}
                            />
                        </div>
                    </div>
                </CardHeader>
                <CardBody className="overflow-scroll px-0">
                    <table className="mt-4 w-full min-w-max table-auto text-left">
                        <thead>
                            <tr>
                                {TABLE_HEAD.map((head, index) => (
                                    <th
                                        key={head}
                                        className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                                    >
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                                        >
                                            {head}{" "}
                                            {index !== TABLE_HEAD.length - 1 && (
                                                <ChevronUpDownIcon strokeWidth={2} className="h-4 w-4" />
                                            )}
                                        </Typography>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {tableRows.map(({ id, email, customer, phone, checkInDate, checkOutDate, price, status }, index) => {
                                const isLast = index === TABLE_ROWS.length - 1;
                                const classes = isLast
                                    ? "p-4"
                                    : "p-4 border-b border-blue-gray-50";

                                let chipColor = "";
                                if (status === "Waiting for confirming") chipColor = "yellow";
                                else if (status === "On going") chipColor = "blue";
                                else if (status === "Done") chipColor = "green";
                                else if (status === "Cancel") chipColor = "red";

                                return (
                                    <tr key={id}>
                                        <td className={classes}>
                                            <div className="flex items-center gap-3">
                                                <div className="flex flex-col">
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal"
                                                    >
                                                        {id}
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
                                                    {customer}
                                                </Typography>
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal opacity-70"
                                                >
                                                    {email}
                                                </Typography>
                                            </div>
                                        </td>
                                        <td className={classes}>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal"
                                            >
                                                {phone}
                                            </Typography>
                                        </td>

                                        <td className={classes}>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal"
                                            >
                                                {checkInDate}
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal"
                                            >
                                                {checkOutDate}
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal"
                                            >
                                                {price}
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <div className="w-max">
                                                <select
                                                    value={status}
                                                    onChange={(event) => handleStatusChange(event, id)}
                                                    className="p-2 border rounded"
                                                >
                                                    {TABS.map(tab => (
                                                        <option key={tab.value} value={tab.value}>
                                                            {tab.label}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        </td>
                                        <td className={classes}>
                                            <Tooltip content="View">
                                                <IconButton variant="text">
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
                <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
                    <Typography variant="small" color="blue-gray" className="font-normal">
                        Page 1 of 10
                    </Typography>
                    <div className="flex gap-2">
                        <Button variant="outlined" size="sm">
                            Previous
                        </Button>
                        <Button variant="outlined" size="sm">
                            Next
                        </Button>
                    </div>
                </CardFooter>
            </Card>



        </>
    );
};

export default ProviderOrderStatus