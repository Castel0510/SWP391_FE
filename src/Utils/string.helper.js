export const formatCurrency = (value) => {
    return value.toLocaleString('it-IT', { style: 'currency', currency: 'VND' });
};

export const formatNumber = (value) => {
    return Number(value)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
