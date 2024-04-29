import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  IconButton,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  Accordion,
  AccordionHeader,
  AccordionBody,
  Input,
  Drawer,
  Card,
} from "@material-tailwind/react";
import {
  UserCircleIcon,
  Cog6ToothIcon,
  PowerIcon,
  CurrencyDollarIcon,
  WrenchScrewdriverIcon,
  UserGroupIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import {
  ChevronRightIcon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
  Bars3Icon,
  XMarkIcon,
  BuildingOfficeIcon,
} from "@heroicons/react/24/outline";
import { HomeModernIcon } from "@heroicons/react/24/outline";

const Sidebar = () => {
  const [open, setOpen] = useState(0);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
const navigate = useNavigate()
  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  const openDrawer = () => {
    setIsDrawerOpen(true);
    document.body.style.overflow = "hidden"; // Disable scrolling in the main page
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
    document.body.style.overflow = "auto"; // Enable scrolling in the main page
  };
const handleLogOut = () => {
  // Remove token from localStorage
  localStorage.removeItem('token');
  navigate('/')
}
  return (
    <>
    <IconButton variant="text" size="lg" onClick={openDrawer}>
      {isDrawerOpen ? (
        <XMarkIcon className="h-8 w-8 stroke-2" />
      ) : (
        <Bars3Icon className="h-8 w-8 stroke-2" />
      )}
    </IconButton>
    <Drawer open={isDrawerOpen} onClose={closeDrawer}>
      <Card
        color="transparent"
        shadow={false}
        className="h-[calc(100vh-2rem)] w-full p-4 overflow-y-auto"
      >
        <div className="mb-2 flex items-center gap-4 p-4">
          <img
            src="/logo.svg"
            alt="brand"
            className="h-12 w-12"
          />
          <Typography variant="h5" color="blue-gray">
            Immo Nesrine
          </Typography>
        </div>
          <div className="p-2">
            <Input
              icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              label="Search"
            />
          </div>
          <List>
            <Accordion
              open={open === 1}
              icon={
                <ChevronDownIcon
                  strokeWidth={2.5}
                  className={`mx-auto h-4 w-4 transition-transform ${
                    open === 1 ? "rotate-180" : ""
                  }`}
                />
              }
            >
              <Link to="/" >
              <ListItem>
              <ListItemPrefix>
              <HomeModernIcon className="h-5 w-5" />
              </ListItemPrefix>
              Dashboard
              </ListItem>
            </Link>
              <ListItem className="p-0" selected={open === 1}>
                <AccordionHeader
                  onClick={() => handleOpen(1)}
                  className="border-b-0 p-3"
                >
                  <ListItemPrefix>
                    <UsersIcon  className="h-5 w-5" />
                  </ListItemPrefix>
                  <Typography
                    color="blue-gray"
                    className="mr-auto font-normal flex items-center"
                  >
                    Employees
                  </Typography>
                </AccordionHeader>
              </ListItem>
              <AccordionBody className="py-1">
                <List className="p-0">
                  <ListItem>
                    <Link to="/employees" className="flex items-center">
                      <ListItemPrefix>
                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                      </ListItemPrefix>
                      View Employees
                    </Link>
                  </ListItem>
                  <ListItem>
                    <Link to="/assignProject" className="flex items-center">
                      <ListItemPrefix>
                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                      </ListItemPrefix>
                      Assign Project
                    </Link>
                  </ListItem>
                </List>
              </AccordionBody>
            </Accordion>
            <Accordion
              open={open === 4}
              icon={
                <ChevronDownIcon
                  strokeWidth={2.5}
                  className={`mx-auto h-4 w-4 transition-transform ${
                    open === 4 ? "rotate-180" : ""
                  }`}
                />
              }
            >
              <ListItem className="p-0" selected={open === 4}>
                <AccordionHeader
                  onClick={() => handleOpen(4)}
                  className="border-b-0 p-3"
                >
                  <ListItemPrefix>
                    <UserCircleIcon className="h-5 w-5" />
                  </ListItemPrefix>
                  <Typography
                    color="blue-gray"
                    className="mr-auto font-normal flex items-center"
                  >
                    Clients
                  </Typography>
                </AccordionHeader>
              </ListItem>
              <AccordionBody className="py-1">
                <List className="p-0">
                  <ListItem>
                    <Link to="/addclient" className="flex items-center">
                      <ListItemPrefix>
                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                      </ListItemPrefix>
                      Add Client
                    </Link>
                  </ListItem>
                  <ListItem>
                    <Link to="/clients" className="flex items-center">
                      <ListItemPrefix>
                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                      </ListItemPrefix>
                      View Clients
                    </Link>
                  </ListItem>
                </List>
              </AccordionBody>
            </Accordion>
            <Accordion
              open={open === 5}
              icon={
                <ChevronDownIcon
                  strokeWidth={2.5}
                  className={`mx-auto h-4 w-4 transition-transform ${
                    open === 5 ? "rotate-180" : ""
                  }`}
                />
              }
            >
              <ListItem className="p-0" selected={open === 5}>
                <AccordionHeader
                  onClick={() => handleOpen(5)}
                  className="border-b-0 p-3"
                >
                  <ListItemPrefix>
                    <BuildingOfficeIcon className="h-5 w-5" />
                  </ListItemPrefix>
                  <Typography
                    color="blue-gray"
                    className="mr-auto font-normal flex items-center"
                  >
                    Projects
                  </Typography>
                </AccordionHeader>
              </ListItem>
              <AccordionBody className="py-1">
                <List className="p-0">
                  <ListItem>
                    <Link to="/addproject" className="flex items-center">
                      <ListItemPrefix>
                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                      </ListItemPrefix>
                      Add Project
                    </Link>
                  </ListItem>
                  <ListItem>
                    <Link to="/projects" className="flex items-center">
                      <ListItemPrefix>
                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                      </ListItemPrefix>
                      View Projects
                    </Link>
                  </ListItem>
                </List>
              </AccordionBody>
            </Accordion>
            <Accordion
              open={open === 7}
              icon={
                <ChevronDownIcon
                  strokeWidth={2.5}
                  className={`mx-auto h-4 w-4 transition-transform ${
                    open === 7 ? "rotate-180" : ""
                  }`}
                />
              }
            >
              <ListItem className="p-0" selected={open === 7}>
                <AccordionHeader
                  onClick={() => handleOpen(7)}
                  className="border-b-0 p-3"
                >
                  <ListItemPrefix>
                    <UserGroupIcon className="h-5 w-5" />
                  </ListItemPrefix>
                  <Typography
                    color="blue-gray"
                    className="mr-auto font-normal flex items-center"
                  >
                    Workers
                  </Typography>
                </AccordionHeader>
              </ListItem>
              <AccordionBody className="py-1">
                <List className="p-0">
                  <ListItem>
                    <Link to="/addworker" className="flex items-center">
                      <ListItemPrefix>
                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                      </ListItemPrefix>
                      Add Worker
                    </Link>
                  </ListItem>
                  <ListItem>
                    <Link to="/workers" className="flex items-center">
                      <ListItemPrefix>
                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                      </ListItemPrefix>
                      View Workers
                    </Link>
                  </ListItem>
                  <ListItem>
                    <Link to="/assignPrjToWorker" className="flex items-center">
                      <ListItemPrefix>
                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                      </ListItemPrefix>
                      Assign Project To Worker
                    </Link>
                  </ListItem>
                </List>
              </AccordionBody>
            </Accordion>
            <Accordion
              open={open === 9}
              icon={
                <ChevronDownIcon
                  strokeWidth={2.5}
                  className={`mx-auto h-4 w-4 transition-transform ${
                    open === 9 ? "rotate-180" : ""
                  }`}
                />
              }
            >
              <ListItem className="p-0" selected={open === 9}>
                <AccordionHeader
                  onClick={() => handleOpen(9)}
                  className="border-b-0 p-3"
                >
                  <ListItemPrefix>
                    <WrenchScrewdriverIcon  className="h-5 w-5" />
                  </ListItemPrefix>
                  <Typography
                    color="blue-gray"
                    className="mr-auto font-normal flex items-center"
                  >
                    Materials
                  </Typography>
                </AccordionHeader>
              </ListItem>
              <AccordionBody className="py-1">
                <List className="p-0">
                  <ListItem>
                    <Link to="/addmaterial" className="flex items-center">
                      <ListItemPrefix>
                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                      </ListItemPrefix>
                      Add Material
                    </Link>
                  </ListItem>
                  <ListItem>
                    <Link to="/materials" className="flex items-center">
                      <ListItemPrefix>
                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                      </ListItemPrefix>
                      View Materials
                    </Link>
                  </ListItem>
                  <ListItem>
                    <Link to="/rents" className="flex items-center">
                      <ListItemPrefix>
                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                      </ListItemPrefix>
                      View rents
                    </Link>
                  </ListItem>
                  <ListItem>
                    <Link to="/rentMaterial" className="flex items-center">
                      <ListItemPrefix>
                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                      </ListItemPrefix>
                      Rent Material
                    </Link>
                  </ListItem>
                </List>
              </AccordionBody>
            </Accordion>
            <Link to="/expenses" >
              <ListItem>
              <ListItemPrefix>
              <CurrencyDollarIcon className="h-5 w-5" />
              </ListItemPrefix>
              Expenses
              </ListItem>
            </Link>
            <hr className="my-2 border-blue-gray-50" />
            <ListItem>
              <ListItemPrefix>
                <Cog6ToothIcon className="h-5 w-5" />
              </ListItemPrefix>
              Settings
            </ListItem>
            <ListItem onClick={handleLogOut}>
              <ListItemPrefix>
                <PowerIcon className="h-5 w-5" />
              </ListItemPrefix>
              Log Out
            </ListItem>
          </List>
        </Card>
      </Drawer>
    </>
  );
};

export default Sidebar;
