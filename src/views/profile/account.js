import React, { useState, useEffect } from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { NavLink, useHistory } from 'react-router-dom';
import Breadcrumb from '../../layouts/AdminLayout/Breadcrumb';
import { GET_ACCOUNT, UPDATE_ACCOUNT, CHANGE_PASSWORD } from '../../helpers/backendHelpers';
import { APIClient } from '../../helpers/apiHelpers';
import { toast, ToastContainer } from 'react-toastify';
import imageIcon from "../../assets/images/picture.png"
import { generateAccessToken } from '../../helpers/accessTokenHelper';
import userLogo from "../../assets/images/avatar.png"
import companyLogo from "../../assets/images/company-logo.png"
import 'react-toastify/dist/ReactToastify.css';

const Account = () => {
    const api = new APIClient();
    generateAccessToken();

    const [activeTab, setActiveTab] = useState('account');

    const handleTabChange = (tab) => {
        setActiveTab(tab);
        if (tab === 'account') {
            generateAccessToken();
        }
    };

    const [accountData, setAccountData] = useState({});
    console.log("accountData", accountData);
    const [formData, setFormData] = useState({
        email: '',
        firstName: '',
        lastName: '',
        phone: '',
        website: '',
        photoId: '',
        logoId: ''
    });

    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: ''
    });

    let token = JSON.parse(localStorage.getItem("authUser"));

    useEffect(() => {
        if (token) {
            fetchAccountDetails();
        }
    }, []);

    const fetchAccountDetails = async () => {
        try {
            console.log("Fetching account details...");
            const response = await api.get(GET_ACCOUNT);
            console.log("Response:", response);
            if (response) {
                setAccountData(response);
                setFormData({
                    email: response.email,
                    firstName: response.firstName,
                    lastName: response.lastName,
                    phone: response.phone,
                    website: response.website,
                    photoId: response.photo.id,
                    logoId: response.logo.id
                });
            } else {
                toast.error('Something went wrong');
            }
        } catch (error) {
            console.error('Error fetching account details:', error);
            toast.error('Error fetching account details');
        }
    };

    const handleSubmit = async (event) => {
        generateAccessToken();
        event.preventDefault();
        try {
            const response = await api.create(UPDATE_ACCOUNT, formData);
            if (response && response.id) {
                toast.success('Account details updated successfully');
            } else {
                toast.error('Failed to update account details');
            }
        } catch (error) {
            console.error('Error updating account details:', error);
            toast.error('Error updating account details');
        }
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handlePasswordChange = (event) => {
        const { name, value } = event.target;
        setPasswordData({ ...passwordData, [name]: value });
    };

    const handlePasswordSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await api.create(CHANGE_PASSWORD, passwordData);
            if (response) {
                toast.success('Password updated successfully');
            } else {
                toast.error('Failed to update password');
            }
        } catch (error) {
            toast.error('Error updating password');
        }
    };

    return (
        <div className="cycle-tab-container">
            <ToastContainer position="top-right" />
            {/* <form> */}
            <div className='row'>
                <div className='col-8'>
                    <ul className="nav nav-tabs custul">
                        <li className={`cycle-tab-item ${activeTab === 'account' ? 'active' : ''}`}>
                            <button
                                className="nav-link"
                                onClick={() => handleTabChange('account')} >
                                Account
                            </button>
                        </li>
                        <li className={`cycle-tab-item ${activeTab === 'changePassword' ? 'active' : ''}`}>
                            <button
                                className="nav-link"
                                onClick={() => handleTabChange('changePassword')} >
                                Change Password
                            </button>
                        </li>
                    </ul>
                </div>
                <div className='col-4 update-button'>
                    {activeTab === 'account' ? (
                        <button type="submit" className="btn btn-primary w-25" onClick={handleSubmit}>Update</button>
                    ) : (
                        <button type="submit" className="btn btn-primary w-50" onClick={handlePasswordSubmit}>Change Password</button>
                    )}
                </div>
            </div>

            <div className="tab-content">
                <div className={`tab-pane fade ${activeTab === 'account' ? 'show active' : ''}`} id="account" role="tabpanel">
                    <div>
                        <div className="row">
                            <div className="col-md-2">
                                <p>Company</p>
                            </div>
                            <div className="col-md-2">
                                <p><b>{accountData.companyName}</b></p>
                            </div>
                        </div>

                        <div className="row mt-2">
                            <div className="col-md-2">
                                <p>Profile Photo</p>
                            </div>
                            <div className="col-md-2">
                                {accountData?.photo?.url ? (
                                    <img
                                        src={accountData.photo.url ? accountData.photo.url : userLogo}
                                        alt="Profile"
                                        className="rounded-circle"
                                        width="88px"
                                        height="88px"
                                    />
                                ) : (
                                    ""
                                )}
                            </div>
                            <div className="col-md-5">
                                <div className='dashed-border'>
                                    <label htmlFor="largeFrame">
                                        <img src={imageIcon} alt="Small Frame" width="50px" height="50px" />
                                        <p><span className="upload-text">Upload a photo </span>or drag and drop</p>
                                    </label>
                                    <input type="file" id="largeFrame" accept=".png, .jpg, .jpeg, .svg" style={{ display: 'none' }} />
                                    <label htmlFor="largeFrame" className="large-image-label">500px*500px png/jpg/jpeg/svg image with size up to 1MB</label>
                                </div>
                            </div>
                        </div>

                        <div className="row mt-4">
                            <div className="col-md-2">
                                <p>Company Logo</p>
                            </div>
                            <div className="col-md-2">
                                {accountData?.logo?.url ? (
                                    <img
                                        src={accountData.logo.url ? accountData.logo.url : companyLogo}
                                        alt="Company Logo"
                                        className="rounded-circle"
                                        width="88px"
                                        height="88px"
                                    />
                                ) : (
                                    ""
                                )}
                            </div>
                            <div className="col-md-5">
                                <div className='dashed-border'>
                                    <label htmlFor="largeFrame">
                                        <img src={imageIcon} alt="Small Frame" width="50px" height="50px" />
                                        <p><span className="upload-text">Upload a photo </span>or drag and drop</p>
                                    </label>
                                    <input type="file" id="largeFrame" accept=".png, .jpg, .jpeg, .svg" style={{ display: 'none' }} />
                                    <label htmlFor="largeFrame" className="large-image-label">500px*500px png/jpg/jpeg/svg image with size up to 1MB</label>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row mt-4">
                        <div className='col-6'>
                            <label className='text-start d-flex'>First Name</label>
                            <div className="input-group mb-4">
                                <input
                                    id='firstName'
                                    type="text"
                                    name="firstName"
                                    className="form-control account-fileds"
                                    placeholder="Enter"
                                    value={formData.firstName}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                        <div className='col-6'>
                            <label className='text-start d-flex'>Last Name</label>
                            <div className="input-group mb-4">
                                <input
                                    id='lastName'
                                    type="text"
                                    name="lastName"
                                    className="form-control"
                                    placeholder="Enter"
                                    value={formData.lastName}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className='col-6'>
                                <label className='text-start d-flex'>Email</label>
                                <div className="input-group mb-4">
                                    <input
                                        id='email'
                                        type="email"
                                        name="email"
                                        className="form-control account-fileds"
                                        placeholder="Enter"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                            <div className='col-6'>
                                <label className='text-start d-flex'>Phone Number</label>
                                <div className="input-group mb-4">
                                    <input
                                        id='phone'
                                        type="tel"
                                        name="phone"
                                        className="form-control account-fileds"
                                        placeholder="Enter"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={`tab-pane fade ${activeTab === 'changePassword' ? 'show active' : ''}`} id="changePassword" role="tabpanel">
                    <div className="row mt-4">
                        <h5 >Change Password</h5>
                        <div className='col-6 mt-2'>
                            <label className='text-start d-flex'>Current Password</label>
                            <div className="input-group mb-4">
                                <input
                                    id='currentPassword'
                                    type="password"
                                    name="currentPassword"
                                    className="form-control account-fileds" placeholder="Enter"
                                    value={passwordData.currentPassword}
                                    onChange={handlePasswordChange}
                                />
                            </div>
                        </div>
                        <div className='col-6'>
                            <label className='text-start d-flex'>New Password</label>
                            <div className="input-group mb-4">
                                <input
                                    id='newPassword'
                                    type="password"
                                    name="newPassword"
                                    className="form-control" placeholder="Enter"
                                    value={passwordData.newPassword}
                                    onChange={handlePasswordChange}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default Account;
