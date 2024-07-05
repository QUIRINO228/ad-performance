import React, { useState } from 'react';
import axios from 'axios';

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

interface AdInfoComponentProps {
    data: AdInfo[];
    onDelete: (id: string) => void;
    onAdd: (adInfo: AdInfo) => void;
}

const AdInfoComponent: React.FC<AdInfoComponentProps> = ({ data, onDelete, onAdd }) => {
    const [showForm, setShowForm] = useState<boolean>(false);
    const [newAdInfo, setNewAdInfo] = useState<Partial<AdInfo>>({
        adTitle: '',
        views: 0,
        clicks: 0,
        price: 0,
        clicks_per_view: 0,
        cost_per_click: 0,
    });

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setNewAdInfo((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const adInfoDto = {
                adTitle: newAdInfo.adTitle || '',
                views: parseInt(newAdInfo.views as unknown as string, 10) || 0,
                clicks: parseInt(newAdInfo.clicks as unknown as string, 10) || 0,
                price: parseFloat(newAdInfo.price as unknown as string) || 0,
                clicks_per_view: newAdInfo.clicks_per_view || 0,
                cost_per_click: newAdInfo.cost_per_click || 0,
            };
            await axios.post<AdInfo>('http://localhost:8080/ads/save_new_ad', adInfoDto, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            setNewAdInfo({
                adTitle: '',
                views: 0,
                clicks: 0,
                price: 0,
                clicks_per_view: 0,
                cost_per_click: 0,
            });


            window.location.reload()
        } catch (error) {
            console.error('Error saving new ad: ', error);
        }
    };

    return (
        <div>
            <button className="ml-3 btn btn-primary" onClick={() => setShowForm(true)}>
                Add
            </button>
            {showForm && (
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="adTitle" className="form-label">
                            Ad Title:
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="adTitle"
                            name="adTitle"
                            value={newAdInfo.adTitle}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="views" className="form-label">
                            Views:
                        </label>
                        <input
                            type="number"
                            className="form-control"
                            id="views"
                            name="views"
                            value={newAdInfo.views}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="clicks" className="form-label">
                            Clicks:
                        </label>
                        <input
                            type="number"
                            className="form-control"
                            id="clicks"
                            name="clicks"
                            value={newAdInfo.clicks}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="price" className="form-label">
                            Price:
                        </label>
                        <input
                            type="number"
                            className="form-control"
                            id="price"
                            name="price"
                            value={newAdInfo.price}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary mr-2">
                        Save
                    </button>
                    <button type="button" className="btn btn-secondary" onClick={() => setShowForm(false)}>
                        Cancel
                    </button>
                </form>
            )}
            <table className="table table-bordered mt-4">
                <thead>
                <tr>
                    <th>Ad Title</th>
                    <th>Views</th>
                    <th>Clicks</th>
                    <th>Price</th>
                    <th>Clicks per View</th>
                    <th>Cost per Click</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {data.map((ad) => (
                    <tr key={ad.id}>
                        <td>{ad.adTitle}</td>
                        <td>{ad.views}</td>
                        <td>{ad.clicks}</td>
                        <td>{ad.price}</td>
                        <td>{ad.clicks_per_view}</td>
                        <td>{ad.cost_per_click}</td>
                        <td>
                            <button className="btn btn-danger" onClick={() => onDelete(ad.id)}>
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdInfoComponent;
