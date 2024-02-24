import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setStartDate } from '../redux/actions/dateActions';
import moment from 'moment';

export default function ControlComponent() {
  const dispatch = useDispatch();
  // State to manage which tab is active
  const [activeTab, setActiveTab] = useState('year'); // 'year' for "A Year Ago", 'month' for "3 Month Ago"

  useEffect(() => {
    // Dispatch action to set the start date to a year ago as the component mounts
    handleYearClick(); // Assuming you want the year to be selected initially
  }, []); // Empty dependency array means this effect runs once on mount

  const handleYearClick = () => {
    const startDate = moment().subtract(1, 'years').format('YYYY-MM-DD');
    dispatch(setStartDate(startDate));
    setActiveTab('year'); // Set active tab to 'year'
  };

  const handleMonthClick = () => {
    const startDate = moment().subtract(3, 'months').format('YYYY-MM-DD');
    dispatch(setStartDate(startDate));
    setActiveTab('month'); // Set active tab to 'month'
  };

  return (
    <div className="flex gap-4">
      <button 
        onClick={handleYearClick} 
        className={` text-white font-semibold py-2 px-4 rounded transition-all duration-300 ease-in-out ${activeTab === 'year' ? ' text-purple-700 shadow-lg' : 'opacity-70 hover:text-purple-600'}`}
      >
        A Year Ago
      </button>
      <button 
        onClick={handleMonthClick} 
        className={`text-white font-semibold py-2 px-4 rounded transition-all duration-300 ease-in-out ${activeTab === 'month' ? 'text-purple-700 shadow-lg' : 'opacity-70 hover:text-purple-600'}`}
      >
        3 Month Ago
      </button>
    </div>
  );
}
