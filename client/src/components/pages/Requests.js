import React from "react";

const Requests = ({ data }) => {
  return (
    <>
      {data &&
        data.map((d) => {
          return (
            <div className='card' key={d.id}>
              <div className='container'>
                <h4>
                  Booking Status: <b>{d.reqStatus}</b>
                </h4>
                <ul>
                  <li>Pick up Location: {d.pickUpAddress}</li>
                  <li>Drop off Location {d.dropOffAddress}</li>
                </ul>
              </div>
            </div>
          );
        })}
    </>
  );
};

export default Requests;
