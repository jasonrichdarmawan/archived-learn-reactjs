import React from 'react';

class HomePage extends React.Component {
    render() {
        // TODO: HomePage
        return (
            <div className="flex-fill d-flex align-items-center">
                <div className="container text-center">
                    <h1>Hello, {localStorage.Authorization}</h1>
                </div>
            </div>
        );
    }
}

export default HomePage;