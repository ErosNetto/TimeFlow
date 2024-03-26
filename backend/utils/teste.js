// const scheduleSchema = {
//   day: String, // Dia da semana
//   startTime: String, // Horário de início (no formato HH:mm)
//   endTime: String, // Horário de término (no formato HH:mm)
//   status: String, // Status do horário (por exemplo, "disponível" ou "ocupado")
// };

// function generateTimeSlots(schedules) {
//   const timeSlots = [];

//   Object.keys(schedules).forEach((day) => {
//     if (schedules[day] === "Fechado") return;

//     const [startTime, endTime] = schedules[day].split(" - ");
//     const startDate = new Date(`01/01/2000 ${startTime}`);
//     const endDate = new Date(`01/01/2000 ${endTime}`);

//     const currentDate = new Date(startDate);

//     while (currentDate < endDate) {
//       timeSlots.push({
//         day: day,
//         startTime: currentDate.toLocaleTimeString([], {
//           hour: "2-digit",
//           minute: "2-digit",
//         }),
//         status: "disponivel",
//       });

//       currentDate.setMinutes(currentDate.getMinutes() + 30);
//     }
//   });

//   return timeSlots;
// }

// // RECEBE DO COMPANY
// const schedules = {
//   Domingo: "Fechado",
//   SegundaFeira: "08:00 - 19:00",
//   TerçaFeira: "08:00 - 19:00",
//   QuartaFeira: "08:00 - 19:00",
//   QuintaFeira: "08:00 - 19:00",
//   SextaFeira: "08:00 - 19:00",
//   Sábado: "10:00 - 17:00",
// };

// const timeSlots = function teste() {
//   return generateTimeSlots(schedules);
// };

// console.log(timeSlots());

// teste();

function generateTimeSlots(schedules, startDate, endDate) {
  const timeSlots = [];
  const currentDate = new Date(startDate);
  const endDateTime = new Date(endDate);

  while (currentDate <= endDateTime) {
    const day = currentDate
      .toLocaleDateString("pt-BR", { weekday: "long" })
      .toLowerCase(); // Convertendo para lowercase
    const schedule = schedules[day];

    if (schedule !== "Fechado") {
      const [startTime, endTime] = schedule.split(" - ");
      const startDateWithTime = new Date(
        `${currentDate.toDateString()} ${startTime}`
      );
      const endDateWithTime = new Date(
        `${currentDate.toDateString()} ${endTime}`
      );

      while (startDateWithTime < endDateWithTime) {
        timeSlots.push({
          day: day.charAt(0).toUpperCase() + day.slice(1), // Convertendo a primeira letra para maiúscula
          startTime: startDateWithTime.toLocaleTimeString("pt-BR", {
            hour: "2-digit",
            minute: "2-digit",
          }),
          status: "disponivel",
        });

        startDateWithTime.setMinutes(startDateWithTime.getMinutes() + 30);
      }
    }

    currentDate.setDate(currentDate.getDate() + 1); // Avança para o próximo dia
  }

  return timeSlots;
}

const schedules = {
  domingo: "Fechado",
  "segunda-feira": "08:00 - 19:00",
  "terça-feira": "08:00 - 19:00",
  "quarta-feira": "08:00 - 19:00",
  "quinta-feira": "08:00 - 19:00",
  "sexta-feira": "08:00 - 19:00",
  sábado: "10:00 - 17:00",
};

const today = new Date();
// const endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0); // Data de término é o último dia do próximo mês
const endDate = new Date(
  today.getFullYear(),
  today.getMonth() + 1,
  today.getDate()
); // Data de término é daqui a um mês

const timeSlotsForMonth = generateTimeSlots(schedules, today, endDate);

console.log(timeSlotsForMonth, endDate);
