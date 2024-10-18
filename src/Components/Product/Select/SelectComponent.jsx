import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import './selectcomponent.css'

export default function SelectSmall({all, itemByNullComp, checkinDec, checkinInc, checkoutDec, checkoutInc}) {
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    //alert(event.target.value);
    setAge(event.target.value);

    if(event.target.value === 0){
      all();
    }
    else if(event.target.value === 1){
      itemByNullComp();
    }
    else if(event.target.value === 2){
      checkinInc();
    }
    else if(event.target.value === 3){
      checkinDec();
    }
    else if(event.target.value === 4){
      checkoutInc();
    }
    else if(event.target.value === 5){
      checkoutDec();
    }
    else
      all();
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 100, width:'25%' }} size="small">
      <InputLabel id="demo-select-small-label">Bộ lọc</InputLabel>
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={age}
        label="Bộ lọc"
        onChange={handleChange}
      >
        <MenuItem value="">
          <em>Mặc định</em>
        </MenuItem>
        <MenuItem value={0}>Tất cả</MenuItem>
        <MenuItem value={1}>Hàng chưa lên kệ</MenuItem>
        <MenuItem value={2}>Ngày nhập tăng</MenuItem>
        <MenuItem value={3}>Ngày nhập giảm</MenuItem>
        <MenuItem value={4}>Ngày xuất tăng</MenuItem>
        <MenuItem value={5}>Ngày xuất giảm</MenuItem>
      </Select>
    </FormControl>
  );
}
