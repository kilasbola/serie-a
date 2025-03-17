const clubLogoCodeMap: { [key: string]: string } = {
    'Juventus FC': 'https://brandlogos.net/wp-content/uploads/2017/01/juventus_fc-brandlogo.net_-300x300.png',
    'AC Milan': 'https://brandlogos.net/wp-content/uploads/2021/05/ac_milan-logo_brandlogos.net_xh3sl-300x485.png',
    'ACF Fiorentina': 'https://brandlogos.net/wp-content/uploads/2012/10/fiorentina-logo-vector.png',
    'AC Monza': 'https://brandlogos.net/wp-content/uploads/2022/08/ac_monza-logo_brandlogos.net_ymngy.png',
    'AS Roma': 'https://brandlogos.net/wp-content/uploads/2024/04/as_roma-logo_brandlogos.net_50bhu-512x656.png',
    'Atalanta BC': 'https://brandlogos.net/wp-content/uploads/2014/12/atalanta_bc-logo_brandlogos.net_yq22a-512x839.png',
    'Bologna FC 1909': 'https://brandlogos.net/wp-content/uploads/2014/12/bologna_fc_1909-logo_brandlogos.net_vf54h-512x744.png',
    'Cagliari Calcio': 'https://brandlogos.net/wp-content/uploads/2021/08/cagliari-calcio-logo-512x512.png',
    'Como 1907': 'https://brandlogos.net/wp-content/uploads/2025/02/como_1907-logo_brandlogos.net_ehxi8-512x529.png',
    'FC Empoli': 'https://upload.wikimedia.org/wikipedia/en/thumb/f/fb/Empoli_FC_crest.svg/269px-Empoli_FC_crest.svg.png?20250118000953',
    'Genoa CFC': 'https://upload.wikimedia.org/wikipedia/en/thumb/2/2c/Genoa_CFC_crest.svg/800px-Genoa_CFC_crest.svg.png',
    'Hellas Verona': 'https://upload.wikimedia.org/wikipedia/en/thumb/9/92/Hellas_Verona_FC_logo_%282020%29.svg/800px-Hellas_Verona_FC_logo_%282020%29.svg.png',
    'Inter Milan': 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/FC_Internazionale_Milano_2021.svg/512px-FC_Internazionale_Milano_2021.svg.png',
    'Parma Calcio 1913': 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Logo_Parma_Calcio_1913_%28adozione_2016%29.svg/800px-Logo_Parma_Calcio_1913_%28adozione_2016%29.svg.png',
    'SS Lazio': 'https://upload.wikimedia.org/wikipedia/en/thumb/c/ce/S.S._Lazio_badge.svg/1024px-S.S._Lazio_badge.svg.png',
    'SSC Napoli': 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/SSC_Napoli_2024_%28deep_blue_navy%29.svg/800px-SSC_Napoli_2024_%28deep_blue_navy%29.svg.png',
    'Torino FC': 'https://upload.wikimedia.org/wikipedia/en/thumb/2/2e/Torino_FC_Logo.svg/800px-Torino_FC_Logo.svg.png',
    'Udinese Calcio': 'https://upload.wikimedia.org/wikipedia/en/thumb/c/ce/Udinese_Calcio_logo.svg/800px-Udinese_Calcio_logo.svg.png',
    'US Lecce': 'https://upload.wikimedia.org/wikipedia/en/thumb/2/23/US_Lecce_crest.svg/800px-US_Lecce_crest.svg.png',
    'Venezia FC': 'https://upload.wikimedia.org/wikipedia/en/thumb/3/39/Venezia_FC_crest.svg/800px-Venezia_FC_crest.svg.png',
};

export const getLogoCode = (clubCode: string): string => {
    return clubLogoCodeMap[clubCode] || ''; // Kode negara tidak valid
};