import { OrgChartTree } from './chart'
import React, { useEffect, useState } from "react"
import axios from 'axios';
import LoadingSpinner from './loadingSpinner';

function Data(props) {
    const [hasError, setHasError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    console.log(props)
    useEffect(() => {
        const djangoCall = async (address, tx, startDate, endDate, blockchain) => {
            setIsLoading(true);
            setHasError(false);
            if (!tx) {
                tx = 'none';
            }
            // console.log(startDate, endDate)
            axios.get(`https://kashflows.herokuapp.com/api/?blockchain=${blockchain}&address=${address}&tx=${tx}&startDate=${startDate}&endDate=${endDate}/`)
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
            djangoCall(props.address, props.tx, props.startDate, props.endDate, props.blockchain);
        }
    }, [props.tx]);

    const [chartData, setChartData] = useState({})
    return (
        <div>
            {isLoading && <LoadingSpinner />}
            <OrgChartTree chartData={chartData} />
        </div>
    )
}

export default Data;