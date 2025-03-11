const clubLogoCodeMap: { [key: string]: string } = {
    'Juventus FC': 'https://brandlogos.net/wp-content/uploads/2017/01/juventus_fc-brandlogo.net_-300x300.png', // Andorra
};

export const getLogoCode = (clubCode: string): string => {
    return clubLogoCodeMap[clubCode] || ''; // Kode negara tidak valid
};