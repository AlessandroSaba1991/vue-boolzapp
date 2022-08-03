/* 
Milestone 1
Replica della grafica con la possibilità di avere messaggi scritti dall’utente (verdi) e dall’interlocutore (bianco) assegnando due classi CSS diverse
Visualizzazione dinamica della lista contatti: tramite la direttiva v-for, visualizzare nome e immagine di ogni contatto
Milestone 2
Visualizzazione dinamica dei messaggi: tramite la direttiva v-for, visualizzare tutti i messaggi relativi al contatto attivo all’interno del pannello della conversazione
Click sul contatto mostra la conversazione del contatto cliccato
Milestone 3
Aggiunta di un messaggio: l’utente scrive un testo nella parte bassa e digitando
“enter” il testo viene aggiunto al thread sopra, come messaggio verde
Risposta dall’interlocutore: ad ogni inserimento di un messaggio, l’utente riceverà
un “ok” come risposta, che apparirà dopo 1 secondo.
Milestone 4
Ricerca utenti: scrivendo qualcosa nell’input a sinistra, vengono visualizzati solo i contatti il cui nome contiene le lettere inserite (es, Marco, Matteo Martina -> Scrivo “mar” rimangono solo Marco e Martina)
*/
/* 
Funzionalità
evitare che l'utente possa inviare un messaggio vuoto o composto solamente da spazi
A) cambiare icona in basso a destra (a fianco all'input per scrivere un nuovo messaggio) finché l'utente sta scrivendo: di default si visualizza l'icona del microfono, quando l'input non è vuoto si visualizza l'icona dell'aeroplano. Quando il messaggio è stato inviato e l'input si svuota, si torna a visualizzare il microfono. 
B) inviare quindi il messaggio anche cliccando sull'icona dell'aeroplano
predisporre una lista di frasi e/o citazioni da utilizzare al posto della risposta "ok:" quando il pc risponde, anziché scrivere "ok", scegliere una frase random dalla lista e utilizzarla come testo del messaggio di risposta del pc
C)visualizzare nella lista dei contatti l'ultimo messaggio inviato/ricevuto da ciascun contatto
inserire l'orario corretto nei messaggi (v. note day.js) 
D)sotto al nome del contatto nella parte in alto a destra, cambiare l'indicazione dello stato: visualizzare il testo "sta scrivendo..." nel timeout in cui il pc risponde, poi mantenere la scritta "online" per un paio di secondi e infine visualizzare "ultimo accesso alle xx:yy" con l'orario corretto
E)dare la possibilità all'utente di cancellare tutti i messaggi di un contatto o di cancellare l'intera chat con tutti i suoi dati: cliccando sull'icona con i tre pallini in alto a destra, si apre un dropdown menu in cui sono presenti le voci "Elimina messaggi" ed "Elimina chat"; cliccando su di essi si cancellano rispettivamente tutti i messaggi di quel contatto (quindi rimane la conversazione vuota) oppure l'intera chat comprensiva di tutti i dati del contatto oltre che tutti i suoi messaggi (quindi sparisce il contatto anche dalla lista di sinistra)
F)dare la possibilità all'utente di aggiungere una nuova conversazione, inserendo in un popup il nome e il link all'icona del nuovo contatto
G)fare scroll in giù in automatico fino al messaggio più recente, quando viene aggiunto un nuovo messaggio alla conversazione (NB: potrebbe esserci bisogno di utilizzare nextTick: https://vuejs.org/v2/api/#Vue-nextTick)
aggiungere le emoticons, tramite l'utilizzo di una libreria, ad esempio: https://www.npmjs.com/package/vue-emoji-picker
Grafica
visualizzare un messaggio di benvenuto che invita l'utente a selezionare un contatto dalla lista per visualizzare i suoi messaggi, anziché attivare di default la prima conversazione
aggiungere una splash page visibile per 1s all'apertura dell'app
A) rendere l'app responsive e fruibile anche su mobile: di default si visualizza solo la lista dei contatti e cliccando su un contatto si vedono i messaggi di quel contatto. B) aggiungere quindi un'icona con una freccia verso sinistra per tornare indietro, dalla visualizzazione della chat alla visualizzazione di tutti i contatti
aggiungere un'icona per ingrandire o rimpicciolire il font: dovrebbe essere sufficiente aggiungere una classe al wrapper principale
aggiungere un'icona per cambiare la modalità light/dark: dovrebbe essere sufficiente aggiungere una classe al wrapper principale
*/
Vue.use(EmojiPicker);

const app = new Vue({
  el: "#app",
  data() {
    return {
      input: "",
      search: "",
    };
  },
  data: {
    contacts: [
      {
        name: "Michele",
        avatar: "_1",
        visible: true,
        messages: [
          {
            date: "10/01/2020, 15:30:55",
            message: "Hai portato a spasso il cane?",
            status: "sent",
          },
          {
            date: "10/01/2020, 15:50:00",
            message: "Ricordati di stendere i panni",
            status: "sent",
          },
          {
            date: "10/01/2020, 16:15:22",
            message: "Tutto fatto!",
            status: "received",
          },
        ],
      },
      {
        name: "Fabio",
        avatar: "_2",
        visible: true,
        messages: [
          {
            date: "20/03/2020, 16:30:00",
            message: "Ciao come stai?",
            status: "sent",
          },
          {
            date: "20/03/2020, 16:30:55",
            message: "Bene grazie! Stasera ci vediamo?",
            status: "received",
          },
          {
            date: "20/03/2020, 16:35:00",
            message: "Mi piacerebbe ma devo andare a fare la spesa.",
            status: "sent",
          },
        ],
      },
      {
        name: "Samuele",
        avatar: "_3",
        visible: true,
        messages: [
          {
            date: "28/03/2020, 10:10:40",
            message: "La Marianna va in campagna",
            status: "received",
          },
          {
            date: "28/03/2020, 10:20:10",
            message: "Sicuro di non aver sbagliato chat?",
            status: "sent",
          },
          {
            date: "28/03/2020, 16:15:22",
            message: "Ah scusa!",
            status: "received",
          },
        ],
      },
      {
        name: "Alessandro B.",
        avatar: "_4",
        visible: true,
        messages: [
          {
            date: "10/01/2020, 15:30:55",
            message: "Lo sai che ha aperto una nuova pizzeria?",
            status: "sent",
          },
          {
            date: "10/01/2020, 15:50:00",
            message: "Si, ma preferirei andare al cinema",
            status: "received",
          },
        ],
      },
      {
        name: "Alessandro L.",
        avatar: "_5",
        visible: true,
        messages: [
          {
            date: "10/01/2020, 15:30:55",
            message: "Ricordati di chiamare la nonna",
            status: "sent",
          },
          {
            date: "10/01/2020, 15:50:00",
            message: "Va bene, stasera la sento",
            status: "received",
          },
        ],
      },
      {
        name: "Claudia",
        avatar: "_6",
        visible: true,
        messages: [
          {
            date: "10/01/2020, 15:30:55",
            message: "Ciao Claudia, hai novità?",
            status: "sent",
          },
          {
            date: "10/01/2020, 15:50:00",
            message: "Non ancora",
            status: "received",
          },
          {
            date: "10/01/2020, 15:51:00",
            message: "Nessuna nuova, buona nuova",
            status: "sent",
          },
        ],
      },
      {
        name: "Federico",
        avatar: "_7",
        visible: true,
        messages: [
          {
            date: "10/01/2020, 15:30:55",
            message: "Fai gli auguri a Martina che è il suo compleanno!",
            status: "sent",
          },
          {
            date: "10/01/2020, 15:50:00",
            message: "Grazie per avermelo ricordato, le scrivo subito!",
            status: "received",
          },
        ],
      },
      {
        name: "Davide",
        avatar: "_8",
        visible: true,
        messages: [
          {
            date: "10/01/2020, 15:30:55",
            message: "Ciao, andiamo a mangiare la pizza stasera?",
            status: "received",
          },
          {
            date: "10/01/2020, 15:50:00",
            message: "No, l'ho già mangiata ieri, ordiniamo sushi!",
            status: "sent",
          },
          {
            date: "10/01/2020, 15:51:00",
            message: "OK!!",
            status: "received",
          },
        ],
      },
    ],
    risposta: [
      "Le cose più belle della vita o sono immorali, o sono illegali, oppure fanno ingrassare.",
      "La vita è come andare in bicicletta. Per mantenere l’equilibrio devi muoverti.",
      "Un giorno qualcuno entrerà nella tua vita e ti farà capire quanto stavi da Dio prima di conoscerlo.",
      "“Io boh, senza parole” come frase per tutto, come pensiero ricorrente, come filosofia di vita.",
      "Stasera esco e faccio vita sociaHAHAHAHAHAHAHAHAH scherzo, sono già in pigiama.",
      "La vita sarebbe tragica se non fosse divertente.",
      "Se la felicità è dietro l’angolo, la mia vita è un cerchio.",
      "Alcune persone non impazziscono mai. Che vite veramente orribili devono condurre.",
      "Tutto ciò di cui hai bisogno è l’amore. Ma un po’ di cioccolato ogni tanto non fa male.",
      "La vita sarebbe infinitamente più felice se nascessimo a ottanta anni e ci avvicinassimo gradualmente ai diciotto.",
      "La prova che nell’universo esistono altre forme di vita intelligente è che non ci hanno ancora contattato.",
      "Non prendere la vita troppo sul serio. Non ne uscirai vivo.",
    ],
    recording: true,
    number_zoom: 100,
    contact_active: 0,
    font_size: 1,
    new_message: "",
    input_search: "",
    new_contact_name: "",
    new_contact_img: "",
    theme_mode: "Dark Theme",
    select_contact: true,
    splash_page: false,
    aside_show: false,
    article_show: false,
    dropdown_message: false,
    dropdown_chat: false,
    dropdown_add_contact: false,
    text_last_message: "Ultimo accesso alle ",
    show_hour: true,
    search: "",
    audioMessage: "",
    mediaRecorder: "",
  },
  methods: {
    startRecording() {
      this.recording = false;
      this.mediaRecorder = "";
      this.audioMessage = "";
      navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
        const mediaRecorder = new MediaRecorder(stream);
        this.mediaRecorder = mediaRecorder;
        this.mediaRecorder.start();
        const audioChunks = [];
        console.log();
        this.mediaRecorder.addEventListener("dataavailable", (event) => {
          audioChunks.push(event.data);
        });
        document
          .getElementById("stopRecording").addEventListener("click", () => {
            console.log(this.mediaRecorder.state == "recording");
            if (this.mediaRecorder.state == "recording") {
              this.recording = true;
              this.mediaRecorder.stop();
            }
          });
        this.mediaRecorder.addEventListener("stop", () => {
          const audioBlob = new Blob(audioChunks);
          const audioUrl = URL.createObjectURL(audioBlob);
          this.audioMessage = new Audio(audioUrl);
          console.log(audioChunks, this.audioMessage);
          this.addAudioMessage();
        });
      });
    },
    messageDateFormat(date) {
      const format = date.split(",");
      return format[1].trim().slice(0, 5);
    },
    dateFormat(index) {
      const date =
        this.contacts[index].messages[this.contacts[index].messages.length - 1]
          .date;
      console.log(date);
      const format = date.split(",");
      console.log(format[1].trim().slice(0, 5));
      return format[1].trim().slice(0, 5);
    },
    change_mode() {
      this.$refs.wrapper.classList.toggle("color_dark");
      if (this.theme_mode === "Dark Theme") {
        this.theme_mode = "Light Theme";
      } else {
        this.theme_mode = "Dark Theme";
      }
    },
    zoom_in() {
      this.font_size += 0.2;
      const element = this.$refs.site_main;
      element.style.cssText = "font-size:" + this.font_size + "rem";
      this.number_zoom += 10;
    },
    zoom_out() {
      this.font_size -= 0.2;
      const element = this.$refs.site_main;
      element.style.cssText = "font-size:" + this.font_size + "rem";
      this.number_zoom -= 10;
    },
    choose_chat(index) {
      this.contact_active = index;
      this.select_contact = false;
      this.splash_page = true;
      setTimeout(function () {
        app.splash_page = false;
        app.article_show = true;
      }, 1000);
    },
    come_back() {
      this.article_show = false;
      this.aside_show = true;
    },
    select_chat(index) {
      this.contact_active = index;
      this.aside_show = false;
      this.article_show = true;
    },
    insert(emoji) {
      this.new_message += emoji;
    },
    img_normal(contact) {
      if (contact.avatar.length > 2) {
        return contact.avatar;
      } else {
        return "./assets/img/avatar" + contact.avatar + ".jpg";
      }
    },
    img_active() {
      const avatar = this.contacts[this.contact_active].avatar;
      if (avatar.length > 2) {
        return avatar;
      } else {
        return "./assets/img/avatar" + avatar + ".jpg";
      }
    },
    addAudioMessage() {
      this.show_hour = false;
      const message_send = {
        date: new Date().toLocaleString(),
        message: `
        <audio controls>
          <source src="${this.audioMessage.src}" type="audio/ogg">
        </audio>
        `,
        status: "sent",
      };
      this.contacts[this.contact_active].messages.push(message_send);
      this.new_message = "";
      this.messageResponse();
    },
    add_message() {
      this.show_hour = false;
      const message_send = {
        date: new Date().toLocaleString(),
        message: this.new_message,
        status: "sent",
      };
      this.contacts[this.contact_active].messages.push(message_send);
      this.new_message = "";
      this.messageResponse();
    },
    messageResponse() {
      this.text_last_message = "Sta scrivendo...";
      setTimeout(function () {
        const messaggio = {
          date: new Date().toLocaleString(),
          message:
            app.risposta[Math.floor(Math.random() * app.risposta.length)],
          status: "received",
        };
        app.text_last_message = "Online";
        app.contacts[app.contact_active].messages.push(messaggio);
        app.$nextTick(app.scroll_down);
      }, 1000);
      setTimeout(function () {
        app.text_last_message = "Ultimo accesso alle ";
        app.show_hour = true;
      }, 3000);
      this.$nextTick(this.scroll_down);
    },
    add_contact() {
      const new_contact = {
        name: this.new_contact_name,
        avatar: this.new_contact_img,
        visible: true,
        messages: [],
      };
      this.contacts.unshift(new_contact);
      this.new_contact_name = "";
      this.new_contact_img = "";
      this.dropdown_add_contact = false;
      this.contact_active = 0;
      this.aside_show = false;
      this.article_show = true;
    },
    confronta(contact, index) {
      const nome = contact.name.toLowerCase();
      const input_search = this.input_search.toLowerCase();
      if (!nome.includes(input_search)) {
        this.contacts[index].visible = false;
      } else {
        this.contacts[index].visible = true;
      }
      return this.contacts[index].visible;
    },
    delete_message(index) {
      this.contacts[this.contact_active].messages.splice(index, 1);
      this.dropdown_message = false;
    },
    delete_all_message() {
      this.contacts[this.contact_active].messages = [];
      this.dropdown_chat = false;
    },
    delete_chat() {
      this.contacts.splice(this.contact_active, 1);
      this.dropdown_chat = false;
      if (this.contact_active === this.contacts.length) {
        this.contact_active--;
      }
      this.aside_show = true;
      this.article_show = false;
    },
    scroll_down() {
      this.$refs.container.scrollIntoView(false);
    },
  },
});
