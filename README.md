## Elevator App - React + Typescript + Vite

Install packages:

```bash
npm install
```

Scripts:

```bash
// to start in development mode 
npm run dev

// to build the application for production usage
npm run build
```

### Description and features

- Dynamic number of buildings by "+" / "-" buttons
- Dynamic number of elevators by "+" / "-" buttons
- Pressing on the floor brings up the elevator
- Clicking on several floors in a row will be added to the queue and executed over time
- If there is more than one elevator, the elevator that is closer will come
- The same floor in a row is not added to the queue for elevator
- If there is already an elevator on the floor, the call button will not work for the others elevators
- It is disabled to add more elevators than floors
