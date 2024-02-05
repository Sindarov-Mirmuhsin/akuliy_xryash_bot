import TelegramBot from 'node-telegram-bot-api';

const bot = new TelegramBot('6162928040:AAFSQhZMCew5UDcCz8rik9BjLBFs6mmFkXU', {
	polling: true,
});

bot.onText(/\/start/, (msg) => {
	bot.sendMessage(
		msg.chat.id,
		`Assalomu alaykum ${msg.from.first_name} xush kelibsiz`,
		{
			reply_markup: {
				keyboard: [
					['Biz Haqimizda 🧑', 'Mahsulot haqida 💊'],
					['Asosiy Menu 🔙'],
				],
				resize_keyboard: true,
			},
		},
	);
});

bot.onText(/\/yordam/, (msg) => {
	bot.sendMessage(
		msg.chat.id,
		`Assalomu alaykum ${msg.from.first_name} xush kelibsiz. https://t.me/Abduqodir_7875 ga murojat qiling`,
		{
			disable_web_page_preview: true,
			reply_markup: {
				keyboard: [
					['Biz Haqimizda 🧑', 'Mahsulot haqida 💊'],
					['Asosiy Menu 🔙'],
				],
				resize_keyboard: true,
			},
		},
	);
});

bot.on('message', (msg) => {
	const chatId = msg.chat.id;

	if (msg.text == 'Asosiy Menu 🔙') {
		bot.sendMessage(chatId, 'Asosiy Menu 🔙', {
			reply_markup: {
				keyboard: [
					['Biz Haqimizda 🧑', 'Mahsulot haqida 💊'],
					['Asosiy Menu 🔙'],
				],
				resize_keyboard: true,
			},
		});
	}
});


bot.on('message', (msg) => {
	const chatId = msg.chat.id;

	if (msg.text == 'Biz Haqimizda 🧑') {
		bot.sendMessage(
			chatId,
			'Murojat uchun telefon: +998881355588  https://t.me/akuliy_xryash_forte',
			{
				reply_markup: {
					keyboard: [
						['Biz Haqimizda 🧑', 'Mahsulot haqida 💊'],
						['Asosiy Menu 🔙'],
					],
					resize_keyboard: true,
				},
			},
		);
	}
});

bot.on('message', (msg) => {
	const chatId = msg.chat.id;

	if (msg.text == 'Mahsulot haqida 💊') {
		bot.sendPhoto(
			chatId,
			'https://firebasestorage.googleapis.com/v0/b/foods-a33b5.appspot.com/o/photo.jpg?alt=media&token=75479ec9-a4a3-4f82-a047-63fac3e32304',
			{
				caption: `
					Bio AKULIY XRYASH FORTE
					
Qo'llanilishi:
					
• Osteoartoz 1-va 2-darajalari; 
• Osteoporoz;
• Osteoxondroz, protruziya, disklar churrasi;
• Artrit, poliartrit, revmatoid artrit;
• Bo'g'im, suyak va paylarning jaroxatlarida;
• Sport jaraxotlarida;
• Jarroxlik amaliyotidan keyingi tiklanishlarda;
• Turli darajadagi teri kuyishlaridna keyingi tiklanish davrida;
• Klimakterik davrida;
• Dermatologik kasalliklarda;
• Kattalar va bolalar, keksa bemorlarda tayanch xarakatlanish tizimi kasalliklarida kompleks davo muolajalari bilan birga qo'llaniladi;
					
BIO TIME COMPANY`,
				reply_markup: {
					inline_keyboard: [
						[
							{
								text: 'Buyurtma berish',
								callback_data: 'register',
							},
						],
					],
				},
			},
		);
	}
});

let contact;
let admin = 5153494777;

// 5153494777

bot.on('callback_query', (msg) => {
	const chatId = msg.message.chat.id;

	if (msg.data == 'register') {
		bot.sendMessage(chatId, 'Kontaktingizni ulashing', {
			reply_markup: JSON.stringify({
				keyboard: [
					[
						{
							text: 'Kontaktni ulashish',
							request_contact: true,
						},
					],
				],
				resize_keyboard: true,
			}),
		});
	}
});

bot.on('contact', (msg) => {
	contact = msg.contact.phone_number;
	bot.sendMessage(msg.chat.id, 'Joylashuvingizni jo`nating', {
		reply_markup: JSON.stringify({
			keyboard: [
				[
					{
						text: 'Joylashuvingizni jo`nating',
						request_location: true,
					},
				],
			],
			resize_keyboard: true,
		}),
	});
});

bot.on('location', async (msg) => {
	const { latitude, longitude } = msg.location;

	const response = await fetch(
		`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=87f526f534114673b84ec3e7d9b3adda`,
	);

	const {
		results: [address],
	} = await response.json();

	bot.sendMessage(
		msg.chat.id,
		'Buyurtmangiz uchun raxmat😊 Tez orada Mutaxasislar siz bilan bog`lanishadi',
	);

	bot.sendMessage(
		admin,
		`
name: ${msg.from.first_name}
location: ${address.formatted},
tel: ${contact}
	`,
	);
});
