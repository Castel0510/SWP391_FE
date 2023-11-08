export const formatCurrency = (value) => {
    try {
        return value.toLocaleString('it-IT', { style: 'currency', currency: 'VND' });
    } catch (error) {
        return '0 VNĐ';
    }
};

export const formatNumberFixed = (value, fixed = 0) => {
    try {
        return Number(value).toFixed(fixed);
    } catch (error) {
        return '0';
    }
};

export const formatNumber = (value) => {
    try {
        return Number(value)
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    } catch (error) {
        return '0';
    }
};
