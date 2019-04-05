import { Job } from "../../graphql-types";

function format(number: number) {
  return number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,"); // 12,345.67
}

export function getSalaryText(job: Job) {
  if (job.salaryExact) {
    return `${job.salaryCurrency}${format(job.salaryExact)}`;
  }
  if (job.salaryMin && job.salaryMax) {
    return `${job.salaryCurrency}${format(job.salaryMin)} - ${
      job.salaryCurrency
    }${format(job.salaryMax)}`;
  }
  if (job.salaryMin) {
    return `From ${job.salaryCurrency}${format(job.salaryMin)}`;
  }
  if (job.salaryMax) {
    return `Up to ${job.salaryCurrency}${format(job.salaryMax)}`;
  }
  return null;
}
