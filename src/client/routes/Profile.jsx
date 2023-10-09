import React from 'react';



const Profile = ({ user }) => {
    return (
        <div className="profile-card">
            <div className="profile-details">
                <h2>
                    {user.firstName} {user.lastName}
                </h2>
                <p>Email: {user.email}</p>
                <p>Address: {user.address}</p>
            </div>
        </div>
    );
};

export default Profile;