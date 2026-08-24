const DEFAULT_TRIAL_DAYS = 6;

export const LICENSE_STATUS = {
  TRIAL: "trial",
  ACTIVE: "active",
  EXPIRED: "expired",
  CANCELLED: "cancelled",
  SUSPENDED: "suspended",
};

export function getTrialDays() {
  const configuredDays = Number(process.env.NEXT_PUBLIC_TRIAL_DAYS);

  if (
    Number.isFinite(configuredDays) &&
    configuredDays > 0 &&
    configuredDays <= 90
  ) {
    return configuredDays;
  }

  return DEFAULT_TRIAL_DAYS;
}

export function createTrialDates(startDate = new Date()) {
  const start = new Date(startDate);

  const end = new Date(start);
  end.setDate(end.getDate() + getTrialDays());

  return {
    trialStartedAt: start.toISOString(),
    trialEndsAt: end.toISOString(),
  };
}

export function getRemainingTrialDays(trialEndsAt, now = new Date()) {
  if (!trialEndsAt) {
    return 0;
  }

  const end = new Date(trialEndsAt);
  const current = new Date(now);

  if (Number.isNaN(end.getTime())) {
    return 0;
  }

  const difference = end.getTime() - current.getTime();

  if (difference <= 0) {
    return 0;
  }

  return Math.ceil(difference / (1000 * 60 * 60 * 24));
}

export function isTrialExpired(trialEndsAt, now = new Date()) {
  if (!trialEndsAt) {
    return true;
  }

  const end = new Date(trialEndsAt);
  const current = new Date(now);

  if (Number.isNaN(end.getTime())) {
    return true;
  }

  return current.getTime() >= end.getTime();
}

export function evaluateLicence({
  licenceStatus,
  trialEndsAt,
  subscriptionEndsAt = null,
  now = new Date(),
}) {
  const current = new Date(now);

  if (licenceStatus === LICENSE_STATUS.SUSPENDED) {
    return {
      status: LICENSE_STATUS.SUSPENDED,
      hasAccess: false,
      reason: "This account has been suspended.",
      remainingTrialDays: 0,
    };
  }

  if (licenceStatus === LICENSE_STATUS.CANCELLED) {
    return {
      status: LICENSE_STATUS.CANCELLED,
      hasAccess: false,
      reason: "This licence has been cancelled.",
      remainingTrialDays: 0,
    };
  }

  if (licenceStatus === LICENSE_STATUS.ACTIVE) {
    if (subscriptionEndsAt) {
      const subscriptionEnd = new Date(subscriptionEndsAt);

      if (
        !Number.isNaN(subscriptionEnd.getTime()) &&
        current.getTime() >= subscriptionEnd.getTime()
      ) {
        return {
          status: LICENSE_STATUS.EXPIRED,
          hasAccess: false,
          reason: "Your paid access has expired.",
          remainingTrialDays: 0,
        };
      }
    }

    return {
      status: LICENSE_STATUS.ACTIVE,
      hasAccess: true,
      reason: "Your paid licence is active.",
      remainingTrialDays: 0,
    };
  }

  if (licenceStatus === LICENSE_STATUS.TRIAL) {
    const remainingTrialDays = getRemainingTrialDays(trialEndsAt, current);

    if (remainingTrialDays > 0) {
      return {
        status: LICENSE_STATUS.TRIAL,
        hasAccess: true,
        reason: `Your 6-day free trial is active with ${remainingTrialDays} day${
          remainingTrialDays === 1 ? "" : "s"
        } remaining.`,
        remainingTrialDays,
      };
    }

    return {
      status: LICENSE_STATUS.EXPIRED,
      hasAccess: false,
      reason:
        "Your 6-day free trial has ended. Please purchase access to continue.",
      remainingTrialDays: 0,
    };
  }

  return {
    status: LICENSE_STATUS.EXPIRED,
    hasAccess: false,
    reason: "No active licence was found for this account.",
    remainingTrialDays: 0,
  };
}

export function canAccessToolkit(licence) {
  return evaluateLicence(licence).hasAccess;
}

export function requiresPurchase(licence) {
  const result = evaluateLicence(licence);

  return (
    result.status === LICENSE_STATUS.EXPIRED ||
    result.status === LICENSE_STATUS.CANCELLED
  );
}
