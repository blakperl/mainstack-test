
'use cient'
/* eslint-disable @typescript-eslint/no-explicit-any */
import { IconButton, InputAdornment, MenuItem, Modal, Select, Slide, Checkbox, ListItemText } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import { LocalizationProvider, DesktopDatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import dayjs from 'dayjs';
import { dateOptions, transactionStatuses, transactionTypes } from '../app-constants';
import { SelectChangeEvent } from '@mui/material';

type FilterModalProps = {
  isVisible: boolean;
  close: () => void;
  applyFilters: (filters: any) => void; 
};

const FilterModal = ({ isVisible, close, applyFilters }: FilterModalProps) => {
  const [startDate, setStartDate] = useState<dayjs.Dayjs | null>(dayjs());
  const [endDate, setEndDate] = useState<dayjs.Dayjs | null>(dayjs());
  const [transactionType, setTransactionType] = useState<string[]>([]);
  const [transactionStatus, setTransactionStatus] = useState<string[]>([]);
  const [openStartDate, setOpenStartDate] = useState(false);
  const [openEndDate, setOpenEndDate] = useState(false);

  const handleDateChange = (setter: React.Dispatch<React.SetStateAction<dayjs.Dayjs | null>>) => (newValue: dayjs.Dayjs | null) => {
    setter(newValue);
  };

  const handleSelectChange = (setter: React.Dispatch<React.SetStateAction<string[]>>) => (event: SelectChangeEvent<string[]>) => {
    setter(typeof event.target.value === 'string' ? event.target.value.split(',') : event.target.value);
  };

  const clearFilters = () => {
    setStartDate(dayjs());
    setEndDate(dayjs());
    setTransactionType([]);
    setTransactionStatus([]);
  };

  

  const handleApplyFilters = () => {
    applyFilters({ 
      startDate: startDate ? startDate.startOf('day').toDate() : undefined,
      endDate: endDate ? endDate.endOf('day').toDate() : undefined,
      transactionType,
      transactionStatus
    });
    close();
  };

  return (
    <Modal open={isVisible}>
      <Slide in={isVisible} direction="left"
       timeout={{ enter: 700, exit: 500 }} 
      easing={{ enter: 'ease-in-out', exit: 'ease-in-out' }}>
        <div className="fixed top-0 right-0 h-screen w-[30rem] bg-white shadow-lg overflow-auto rounded-md">
          <div className="bg-white p-4 lg:w-[30rem] overflow-auto relative rounded-md">
            <div className="w-full flex justify-between items-center">
              <p className='font-bold text-black text-xl'>Filter</p>
              <IconButton onClick={close}>
                <CloseIcon />
              </IconButton>
            </div>

            <div className="grid space-y-6 p-4 bg-white mt-5 rounded-md">
              <div className="flex gap-6">
                {dateOptions.map((label) => (
                  <p key={label} className="py-2 text-sm cursor-pointer">
                    {label}
                  </p>
                ))}
              </div>

              <div>
                <p className='text-lg mb-2 font-bold text-black '>Date Range</p>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <div className="flex gap-4">
                    {[{ label: 'Start Date', value: startDate, open: openStartDate, setOpen: setOpenStartDate, onChange: handleDateChange(setStartDate) },
                      { label: 'End Date', value: endDate, open: openEndDate, setOpen: setOpenEndDate, onChange: handleDateChange(setEndDate) }]
                      .map(({ label, value, open, setOpen, onChange }) => (
                        <DesktopDatePicker
                          key={label}
                          value={value}
                          onChange={onChange}
                          open={open}
                          onOpen={() => setOpen(true)}
                          onClose={() => setOpen(false)}
                          disableOpenPicker
                          slotProps={{
                            textField: {
                              sx: { backgroundColor: "#EFF1F6", border: "none", borderRadius: "25px" },
                              InputProps: {
                                endAdornment: (
                                  <InputAdornment position="end">
                                    <IconButton onClick={() => setOpen((prev) => !prev)}>
                                      {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                                    </IconButton>
                                  </InputAdornment>
                                ),
                              },
                            },
                          }}
                        />
                      ))}
                  </div>
                </LocalizationProvider>
              </div>

              {[{ title: 'Transaction Type', state: transactionType, handler: handleSelectChange(setTransactionType), options: transactionTypes },
                { title: 'Transaction Status', state: transactionStatus, handler: handleSelectChange(setTransactionStatus), options: transactionStatuses }]
                .map(({ title, state, handler, options }) => (
                  <div key={title}>
                    <p className='text-lg text-black  mb-2 font-bold'>{title}</p>
                    <Select
                      multiple
                      value={state}
                      onChange={handler}
                      fullWidth
                      renderValue={(selected) => selected.join(', ')}
                    >
                      {options.map((option) => (
                        <MenuItem key={option} value={option} className='text-sm'>
                          <Checkbox checked={state.includes(option)} />
                          <ListItemText primary={option} />
                        </MenuItem>
                      ))}
                    </Select>
                  </div>
                ))}

              <div className='flex justify-center mt-6 gap-6'>
                <button
                  className="outlined-button bg-white cursor-pointer border border-[#EFF1F6] h-12 w-[10rem] flex place-items-center justify-center"
                  onClick={clearFilters}
                >
                  Clear
                </button>
                <button
                  className="filled-button cursor-pointer h-12 w-[10rem] flex place-items-center justify-center"
                  onClick={handleApplyFilters}
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div>
      </Slide>
    </Modal>
  );
};

export default FilterModal;
