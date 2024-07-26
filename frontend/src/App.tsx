
import './App.css';
import Footer from './layout/Footer/Footer';
import Header from './layout/Header/Header';
import {useDispatch } from 'react-redux';
import { useEffect } from 'react';
import axios from 'axios';
import { setPhones, setEmails, setAddresses, setWorkingHours } from './slices/contactSlice';
import MainPanel from './layout/MainPanel/MainPanel';


function App() {

	const dispatch = useDispatch();

	useEffect(() => {
		axios.get('/api/contacts/')
			.then(response => {
				const data = response.data;
				dispatch(setPhones(data.phones.map((item: { id: number, number: string}) => item.number)));
				dispatch(setEmails(data.emails.map((item: { id: number, email: string}) => item.email)));
				dispatch(setAddresses(data.addresses.map((item: { id: number, address: string}) => item.address)));
				dispatch(setWorkingHours(data.working_hours.map((item: 
					{ id: number, opening_hours: string, closing_hours:string}) => {
					item.opening_hours, item.closing_hours;
				})));
			})
			
			.catch(error => {
				console.error('There was an error fetching the data!', error);
			});
	}, [dispatch]);
		
	return (
		<>
			<Header/>
			<MainPanel/>
			<Footer/>
		</>
	);
}

export default App;
