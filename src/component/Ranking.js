import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import Header from './parts/header';

export default class Ranking extends Component {
    render(){
        const data = {
            labels: ['April', 'May', 'June', 'July', 'August', 'September'],
            datasets: [
              {
                data: [67, 79, 52, 41, 66, 43],
              },
            ],
        };

        function getApexData(){
            fetch('https://public-api.tracker.gg/v2/apex/standard/profile/battlenet/MirroR%2311669/segments/legend', {
                headers: { 'Authorization': 'Bearer: 01626f79-3f98-46e9-a20b-f0343ab2ddd6' }
              }).then(function(response) {
                  console.log(response);
                return response.json();
              });
        }

        return(
            <div>
                <Header />
                <button onClick={() => getApexData()}></button>
                {/* <Line data={data} /> */}
            </div>            
        )
    }
}