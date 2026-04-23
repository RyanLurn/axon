import { isCancel, cancel, select, text, log } from "@clack/prompts";

import { DAYTONA, MODAL, E2B } from "@/constants";

const duration = await select({
  message: "How long do you want to calculate?",
  options: [
    { label: "1 day", value: 1 },
    { label: "1 month", value: 30 },
    { label: "1 year", value: 365 },
  ],
});

if (isCancel(duration)) {
  cancel("Operation canceled.");
  process.exit(0);
}

const hours = await text({
  message: `How many hours ${duration === 1 ? "" : "per day "}does the sandbox runs?`,
  validate: (value) => {
    if (value === undefined) {
      return "Please enter a number";
    }
    const parsedValue = parseInt(value);
    if (isNaN(parsedValue)) {
      return "Please enter a valid integer";
    }
    return undefined;
  },
});

if (isCancel(hours)) {
  cancel("Operation canceled.");
  process.exit(0);
}

const parsedHours = parseInt(hours);

log.info("Calculating E2B's cost...");
const e2bCpuCost = E2B.cpu * 2 * parsedHours * duration;
log.step(
  `E2B's 2 vCPU cost $${e2bCpuCost} to run for ${duration} day${duration === 1 ? "" : "s"}, ${parsedHours} hour${parsedHours === 1 ? "" : "s"} per day.`
);
const e2bRamCost = E2B.ram * 2 * parsedHours * duration;
log.step(
  `E2B's 4GB of RAM costs $${e2bRamCost} to run for ${duration} day${duration === 1 ? "" : "s"}, ${parsedHours} hour${parsedHours === 1 ? "" : "s"} per day.`
);
const e2bTotalCost = e2bCpuCost + e2bRamCost;
log.step(
  `In total, E2B's sandbox costs $${e2bTotalCost} to run for ${duration} day${duration === 1 ? "" : "s"}, ${parsedHours} hour${parsedHours === 1 ? "" : "s"} per day.`
);

log.info("Calculating Daytona's cost...");
const daytonaCpuCost = DAYTONA.cpu * 2 * parsedHours * duration;
log.step(
  `Daytona's 2 vCPU cost $${daytonaCpuCost} to run for ${duration} day${duration === 1 ? "" : "s"}, ${parsedHours} hour${parsedHours === 1 ? "" : "s"} per day.`
);
const daytonaRamCost = DAYTONA.ram * 2 * parsedHours * duration;
log.step(
  `Daytona's 4GB of RAM costs $${daytonaRamCost} to run for ${duration} day${duration === 1 ? "" : "s"}, ${parsedHours} hour${parsedHours === 1 ? "" : "s"} per day.`
);
const daytonaTotalCost = daytonaCpuCost + daytonaRamCost;
log.step(
  `In total, Daytona's sandbox costs $${daytonaTotalCost} to run for ${duration} day${duration === 1 ? "" : "s"}, ${parsedHours} hour${parsedHours === 1 ? "" : "s"} per day.`
);

log.info("Calculating Modal's cost...");
const modalCpuCost = MODAL.cpu * 2 * parsedHours * duration;
log.step(
  `Modal's 2 vCPU cost $${modalCpuCost} to run for ${duration} day${duration === 1 ? "" : "s"}, ${parsedHours} hour${parsedHours === 1 ? "" : "s"} per day.`
);
const modalRamCost = MODAL.ram * 2 * parsedHours * duration;
log.step(
  `Modal's 4GB of RAM costs $${modalRamCost} to run for ${duration} day${duration === 1 ? "" : "s"}, ${parsedHours} hour${parsedHours === 1 ? "" : "s"} per day.`
);
const modalTotalCost = modalCpuCost + modalRamCost;
log.step(
  `In total, Modal's sandbox costs $${modalTotalCost} to run for ${duration} day${duration === 1 ? "" : "s"}, ${parsedHours} hour${parsedHours === 1 ? "" : "s"} per day.`
);
