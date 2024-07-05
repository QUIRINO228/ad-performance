import React, { useEffect, useState } from 'react';
import './App.css';
import BarChartComponent from "./components/BarChart";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from "./components/Navbar";
import { MyProvider } from './MyContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import AdInfoComponent from "./components/AdInfo";

interface AdInfo {
    id: string;
    adTitle: string;
    date: string;
    views: number;
    clicks: number;
    price: number;
    clicks_per_view: number;
    cost_per_click: number;
}

const App: React.FC = () => {
    const [adInfo, setAdInfo] = useState<AdInfo[]>([]);
    const [filteredAdInfo, setFilteredAdInfo] = useState<AdInfo[]>([]);
    const [filterViews, setFilterViews] = useState<number>(0);

    useEffect(() => {
        const fetchAdInfoData = async () => {
            try {
                const response = await axios.get<AdInfo[]>('http://localhost:8080/ads/get-all-ads');
                setAdInfo(response.data);
                setFilteredAdInfo(response.data); // Initialize filtered data with all data
            } catch (error) {
                console.error('Error fetching ad data: ', error);
            }
        };

        fetchAdInfoData();
    }, []);

    useEffect(() => {
        if (filterViews === 0) {
            setFilteredAdInfo(adInfo);
        } else {
            const filteredData = adInfo.filter(ad => ad.views >= filterViews);
            setFilteredAdInfo(filteredData);
        }
    }, [filterViews, adInfo]);


    const handleDeleteAd = async (id: string) => {
        try {
            await axios.delete(`http://localhost:8080/ads/delete/${id}`);
            const updatedData = adInfo.filter(ad => ad.id !== id);
            setAdInfo(updatedData);
            setFilteredAdInfo(filteredAdInfo.filter(ad => ad.id !== id));
        } catch (error) {
            console.error('Error deleting ad: ', error);
        }
    };

    const handleAddAd = async (newAdInfo: AdInfo) => {
        try {
            const response = await axios.post<AdInfo>('http://localhost:8080/ads/save_new_ad', newAdInfo, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            setAdInfo([...adInfo, response.data]);
            setFilteredAdInfo([...filteredAdInfo, response.data]);
        } catch (error) {
            console.error('Error adding new ad: ', error);
        }
    };

    return (
        <BrowserRouter>
            <MyProvider>
                <Navbar />
                <div className="bar-container container-lg">
                    <Routes>
                        <Route path="/dashboard" element={<BarChartComponent adInfo={filteredAdInfo} handleFilterChange={setFilterViews} />} />
                        <Route path="/dashboard" element={<BarChartComponent adInfo={filteredAdInfo} handleFilterChange={setFilterViews} />} />
                        <Route
                            path="/ad-info"
                            element={<AdInfoComponent data={adInfo} onDelete={handleDeleteAd} onAdd={handleAddAd} />}/>
                    </Routes>
                </div>
            </MyProvider>
        </BrowserRouter>
    );
}

export default App;
