const CustomerPagination = () => {
    return (
        <>
        <button> 
            <form method="POST" action="/addCustomer" className="bg-black text-white">
                <div>
                    <label>customer_id: <input type="number" name="customer_id"/></label>
                </div>
                <div>
                    <label>store_id: <input type="number" name="store_id"/></label>
                </div>
                    <div>
                    <label>first_name: <input type="text" name="first_name"/></label>
                </div>
                <div>
                    <label>last_name: <input type="text" name="last_name"/></label>
                </div>
                <div>
                    <label>email: <input type="text" name="email"/></label>
                </div>
                <div>
                    <label>address_id: <input type="number" name="address_id"/></label>
                </div>
                <div>
                    <label>active: <input type="number" name="active"/></label>
                </div>
                <div>
                    <label>customer_id: <input type="number" name="customer_id"/></label>
                </div>
                <div>
                    <label>store_id: <input type="number" name="store_id"/></label>
                </div>
                <div>
                    <label>address: <input type="text" name="address"/></label>
                </div>
                <div>
                    <label>address2: <input type="text" name="address2"/></label>
                </div>
                <div>
                    <label>district: <input type="text" name="district"/></label>
                </div>
                <div>
                    <label>city_id: <input type="number" name="city_id"/></label>
                </div>
                <div>
                    <label>postal_code: <input type="number" name="postal_code"/></label>
                </div>
                <div>
                    <label>phone: <input type="number" name="phone"/></label>
                </div>
                <div>
                    <label>location: <input type="text" name="location"/></label>
                </div>
                <input type="submit" value="Submit"/>
            </form>
        </button>
        <div className="join bg-blue">
            <button className="join-item btn">«</button>
            <button className="join-item btn">Page 22</button>
            <button className="join-item btn">»</button>
        </div>
        </>
    );
};
export default CustomerPagination; 