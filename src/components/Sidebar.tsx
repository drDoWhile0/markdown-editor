import TextField from '@mui/material/TextField';
import NewFile from '../assets/icons/NewFile.png';
import NewFolder from '../assets/icons/NewFolder.png';
import Sort from '../assets/icons/Sort.png';
import Trash from '../assets/icons/Trash.png'
import Settings from '../assets/icons/Settings.png';

function SideBar() {
    return (
        <div className='px-[40px]'>
            <div className='sidebar-component__search justify-self-center my-6'>
                <TextField 
                    id='outlined-basic'
                    variant='outlined'
                    fullWidth
                    label="Search"
                    sx={{
                        "& .MuiInputLabel-root:not(.MuiInputLabel-shrink)": {
                            top: "50%",
                            transform: "translate(14px, -50%)",
                        },
                        "& .MuiInputBase-input": {
                            color: "#e8e6e6",
                        },
                        "& .MuiOutlinedInput-root": {
                        "& fieldset": { borderColor: "#3d3d3d" },
                        "&:hover fieldset": { borderColor: "#ff6a00"} ,
                        "&.Mui-focused fieldset": { borderColor: "#ff6a00", },
                        },
                        "& label": {
                            color: "#e8e6e6",
                            opacity: 1,
                        },
                        "& label.Mui-focused": {
                            color: "#ff6a00",
                        },
                    }}
                />
            </div>
            <div className="flex justify-evenly items-center my-4">
                <button className='cursor-pointer px-[6px]'>
                    <img src={NewFile} alt="New File" />
                </button>
                <button className='cursor-pointer px-[6px]'>
                    <img src={NewFolder} alt="New Folder" />
                </button>
                <button className='cursor-pointer'>
                    <img src={Sort} alt="Sort Order" />
                </button>
                <button className='cursor-pointer px-[6px]'>
                    <img src={Trash} alt="Deleted Projects" />
                </button>
            </div>
            {/* TODO: take all related files from current user, and map them to this list */}
            <ul className='text-[#e8e6e6]'>
                <li className='my-4'>Project 1</li>
                <li className='my-4'>Project 2</li>
                <li className='my-4'>Project 3</li>
                <li className='my-4'>Project 4</li>
            </ul>

            <div>
                <button className='cursor-pointer'>
                    <img src={Settings} alt="Settings" />
                </button>
            </div>
        </div>
    );
}

export default SideBar;