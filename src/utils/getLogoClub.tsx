const clubLogoCodeMap: { [key: string]: string } = {
    'Juventus FC': 'https://brandlogos.net/wp-content/uploads/2017/01/juventus_fc-brandlogo.net_-300x300.png',
    'AC Milan': 'https://brandlogos.net/wp-content/uploads/2021/05/ac_milan-logo_brandlogos.net_xh3sl-300x485.png',
    'ACF Fiorentina': 'https://brandlogos.net/wp-content/uploads/2012/10/fiorentina-logo-vector.png',
    'AC Monza': 'https://brandlogos.net/wp-content/uploads/2022/08/ac_monza-logo_brandlogos.net_ymngy.png',
    'AS Roma': 'https://brandlogos.net/wp-content/uploads/2024/04/as_roma-logo_brandlogos.net_50bhu-512x656.png',
    'Atalanta BC': 'https://brandlogos.net/wp-content/uploads/2014/12/atalanta_bc-logo_brandlogos.net_yq22a-512x839.png',
    'Bologna FC 1909': 'https://brandlogos.net/wp-content/uploads/2014/12/bologna_fc_1909-logo_brandlogos.net_vf54h-512x744.png',
};

export const getLogoCode = (clubCode: string): string => {
    return clubLogoCodeMap[clubCode] || ''; // Kode negara tidak valid
};