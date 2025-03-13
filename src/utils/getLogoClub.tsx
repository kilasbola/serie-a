const clubLogoCodeMap: { [key: string]: string } = {
    'Juventus FC': 'https://brandlogos.net/wp-content/uploads/2017/01/juventus_fc-brandlogo.net_-300x300.png',
    'AC Milan': 'https://brandlogos.net/wp-content/uploads/2021/05/ac_milan-logo_brandlogos.net_xh3sl-300x485.png',
    'ACF Fiorentina': 'https://brandlogos.net/wp-content/uploads/2012/10/fiorentina-logo-vector.png',
};

export const getLogoCode = (clubCode: string): string => {
    return clubLogoCodeMap[clubCode] || ''; // Kode negara tidak valid
};