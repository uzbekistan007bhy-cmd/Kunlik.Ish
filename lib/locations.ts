export interface Region {
  name: string;
  districts: string[];
}

export const UZ_LOCATIONS: Region[] = [
  {
    name: 'Toshkent shahri',
    districts: ['Olbek', 'Chilonzor', 'Yunusobod', 'Mirzo Ulugbek', 'Yakkasaroy', 'Yashnobod', 'Shayxontohur', 'Mirobod', 'Uchtepa', 'Sergeli', 'Yangihayot', 'Bektemir'],
  },
  {
    name: 'Toshkent viloyati',
    districts: ['Olmaliq sh.', 'Angren sh.', 'Chirchiq sh.', 'Yangiyo‘l sh.', 'Oqqurg‘on t.', 'Bo‘stonliq t.', 'Bo‘ka t.', 'Zangiota t.', 'Qibray t.', 'Parkent t.', 'Pskent t.', 'Toshkent t.', 'Chinoz t.', 'Yuqorichirchiq t.', 'Yangiyo‘l t.'],
  },
  {
    name: 'Samarqand viloyati',
    districts: ['Samarqand sh.', 'Kattaqo‘rg‘on sh.', 'Bulung‘ur t.', 'Jomboy t.', 'Ishtixon t.', 'Kattaqo‘rg‘on t.', 'Narpay t.', 'Nurobod t.', 'Oqdaryo t.', 'Paxtachi t.', 'Payariq t.', 'Pastdarg‘om t.', 'Samarqand t.', 'Toyloq t.'],
  },
  {
    name: 'Andijon viloyati',
    districts: ['Andijon sh.', 'Xonobod sh.', 'Andijon t.', 'Asaka t.', 'Baliqchi t.', 'Buloqboshi t.', 'Bo‘ston t.', 'Jalaquduq t.', 'Izboskan t.', 'Marhamat t.', 'Paxtaobod t.', 'Ulug‘nor t.', 'Xo‘jaobod t.', 'Shahrixon t.'],
  },
  {
    name: 'Farg‘ona viloyati',
    districts: ['Farg‘ona sh.', 'Marg‘ilon sh.', 'Qo‘qon sh.', 'Quvasoy sh.', 'Beshariq t.', 'Bog‘dod t.', 'Buvayda t.', 'Dang‘ara t.', 'Yozyovon t.', 'Quva t.', 'Qoshtepa t.', 'Oltiariq t.', 'Rishton t.', 'Sox t.', 'Toshloq t.', 'Uchko‘prik t.', 'Farg‘ona t.', 'O‘zbekiston t.'],
  },
  {
    name: 'Namangan viloyati',
    districts: ['Namangan sh.', 'Kosonsoy t.', 'Mingbuloq t.', 'Namangan t.', 'Norin t.', 'Pop t.', 'To‘raqo‘rg‘on t.', 'Uychi t.', 'Uchqo‘rg‘on t.', 'Chortoq t.', 'Chust t.', 'Yangiqo‘rg‘on t.'],
  },
  {
    name: 'Buxoro viloyati',
    districts: ['Buxoro sh.', 'Kogon sh.', 'Olot t.', 'Buxoro t.', 'Vobkent t.', 'G‘ijduvon t.', 'Jondor t.', 'Kogon t.', 'Qorako‘l t.', 'Qorovulbozor t.', 'Peshku t.', 'Romitan t.', 'Shofirkon t.'],
  },
  {
    name: 'Xorazm viloyati',
    districts: ['Urganch sh.', 'Xiva sh.', 'Bog‘ot t.', 'Gurlan t.', 'Qushko‘pir t.', 'Shovot t.', 'Tuproqqal’a t.', 'Urganch t.', 'Xazorasp t.', 'Xonqa t.', 'Xiva t.', 'Yangiariq t.', 'Yangibozor t.'],
  },
  {
    name: 'Qashqadaryo viloyati',
    districts: ['Qarshi sh.', 'Shahrisabz sh.', 'Dehqonobod t.', 'Kasbi t.', 'Kitob t.', 'Koson t.', 'Mirishkor t.', 'Muborak t.', 'Nishon t.', 'Qarshi t.', 'Chiroqchi t.', 'Shahrisabz t.', 'Yakkabog‘ t.', 'Ko‘kdala t.'],
  },
  {
    name: 'Surxondaryo viloyati',
    districts: ['Termiz sh.', 'Angor t.', 'Bandixon t.', 'Boysun t.', 'Denov t.', 'Jarkurg‘on t.', 'Qiziriq t.', 'Qumqo‘rg‘on t.', 'Muzrobot t.', 'Sariosiyo t.', 'Termiz t.', 'Uzun t.', 'Sherobod t.', 'Shorchi t.'],
  },
  {
    name: 'Navoiy viloyati',
    districts: ['Navoiy sh.', 'Zarafshon sh.', 'Konimex t.', 'Karmana t.', 'Qiziltepa t.', 'Xatirchi t.', 'Navbahor t.', 'Nurota t.', 'Tomdi t.', 'Uchkuduk t.'],
  },
  {
    name: 'Jizzax viloyati',
    districts: ['Jizzax sh.', 'Arnasoy t.', 'Baxmal t.', 'G‘allaorol t.', 'Do‘stlik t.', 'Sh.Rashidov t.', 'Zarbdor t.', 'Zafarobod t.', 'Zomin t.', 'Mirzacho‘l t.', 'Paxtakor t.', 'Forish t.', 'Yangiobod t.'],
  },
  {
    name: 'Qoraqalpog‘iston Respublikasi',
    districts: ['Nukus sh.', 'Amudaryo t.', 'Beruniy t.', 'Qorao‘zak t.', 'Kegeyli t.', 'Qo‘ng‘irot t.', 'Qonliko‘l t.', 'Mo‘ynoq t.', 'Nukus t.', 'Taqiyotosh t.', 'Taxtako‘pir t.', 'To‘rtko‘l t.', 'Xo‘jayli t.', 'Chimboy t.', 'Shumanay t.', 'Elikqala t.'],
  },
];
