import * as React from 'react';

import ReactApexChart from 'react-apexcharts';
import { formatNumber } from '../../Utils/string.helper';
import PropTypes from 'prop-types';

const ChartBasicArea = ({ title, values, unit, colors }) => {
    return (
        <div>
            <ReactApexChart
                options={{
                    chart: {
                        zoom: {
                            enabled: false,
                        },
                    },
                    dataLabels: {
                        enabled: false,
                    },
                    stroke: {
                        curve: 'straight',
                    },

                    title: {
                        text: title,
                        align: 'left',
                    },
                    labels: values.map((item) => item.name),
                    xaxis: {
                        labels: {
                            // formatter: (value) => {
                            //     return formatNumber(value);
                            // },
                            formatter: (value) => {
                                return value;
                            },
                        },
                    },
                    yaxis: {
                        opposite: true,
                    },
                    legend: {
                        horizontalAlign: 'left',
                    },
                    colors: colors,
                }}
                series={[
                    {
                        name: unit,
                        data: values.map((item) => item.data),
                    },
                ]}
                type="area"
                height={350}
            />
        </div>
    );
};

ChartBasicArea.propTypes = {
    values: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string,
            data: PropTypes.number,
        })
    ),
    unit: PropTypes.string,
    title: PropTypes.string,
    colors: PropTypes.arrayOf(PropTypes.string),
};

export default ChartBasicArea;
