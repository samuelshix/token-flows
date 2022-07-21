import { OrgChartTree } from './chart'
import React, { useEffect, useState } from "react"
import axios from 'axios';
import LoadingSpinner from './loadingSpinner';

function Data(props) {
    const [hasError, setHasError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const djangoCall = async (address, tx, startDate, endDate) => {
            setIsLoading(true);
            setHasError(false);
            if (!tx) {
                tx = 'none';
            }
            // console.log(startDate, endDate)
            axios.get(`https://kashflows.herokuapp.com/api/?address=${address}&tx=${tx}&startDate=${startDate}&endDate=${endDate}/`)
                .then(res => {
                    // console.log(res.data)
                    setChartData(res.data);
                    setIsLoading(false);
                }).catch(err => {
                    setHasError(true);
                    setIsLoading(false);
                })
        }
        if (props.address) {
            djangoCall(props.address, props.tx, props.startDate, props.endDate);
        }
    }, [props]);

    const [chartData, setChartData] = useState({})
    return (
        <div>
            {isLoading && <LoadingSpinner />}
            <OrgChartTree chartData={chartData} />
        </div>
    )
}

export default Data;