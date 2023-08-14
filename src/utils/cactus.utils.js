export function getAbstain(val) {
    if (val == 'D') {
      return 'Abstains removed from vote';
    } else if (val == 'Y') {
      return 'Abstains count as YES';
    } else if (val == 'N') {
      return 'Abstains count as NO';
    } else if (val == 'A') {
      return 'Abstain';
    }
  }
  
  export const getAbstainPenalties = val => {
    if (val == 'D') {
      return 'No penalty';
    } else if (val == 'VRW') {
      return 'Voting privileges removed 1 week for excessive abstains';
    } else if (val == 'PRW') {
      return 'Proposal privileges removed 1 week for excessive abstains';
    } else {
      return 'Automatic proposal for expulsion for excessive abstains';
    }
  };
  
  export const getProposalCancellation = val => {
    if (val == 'D') {
      return 'No Cancellation';
    } else if (val == 'PCA') {
      return 'Proposal creator can cancel vote anytime';
    } else if (val == 'PCNV') {
      return 'Proposal creator can cancel vote if no one has voted';
    } else {
      return 'Proposal can be canceled by creator if suggestion has been made';
    }
  };
  
  export const getSubmission = val => {
    if (val == 'D') {
      return 'Proposal is binding, automatically submitted';
    } else if (val == 'WPS') {
      return 'Person who created proposal submits trade';
    } else {
      return 'Group admin submits trade';
    }
  };
  
  export const geSuggestiont = val => {
    if (val == 'D') {
      return 'Allowed 1 per proposal';
    } else if (val == 'NA') {
      return 'Not allowed';
    } else if (val == 'AW') {
      return 'Allowed (1 per week)';
    } else {
      return 'Allowed (1 per day)';
    }
  };
  
  export const getPropSubLimit = val => {
    if (val == 'D') {
      return 'no limit';
    } else if (val == '1_D') {
      return '1 per day per user';
    } else {
      return '3 per day per user';
    }
  };
  
  export const getSettingChanges = val => {
    if (val == 'D') {
      return 'Users vote to change settings, percentage required = percentage required for proposal to pass';
    } else if (val == 'UVU') {
      return 'Users vote to change settings, unanimous';
    } else if (val == 'UVP') {
      return 'Users vote to change settings, any percentage';
    } else {
      return 'Admin/Admins changes settings';
    }
  };
  
  export const getAutoAbstain = val => {
    if (val == 'D') {
      return 'Allowed, Members set hours anytime';
    } else if (val == 'NA') {
      return 'Not allowed';
    } else if (val == 'AH') {
      return 'Allowed but hours must be set 12 hours in advance';
    } else {
      return 'Allowed but hours must be set 1 day in advance';
    }
  };
  
  export const getExplusion = val => {
    if (val == 'D') {
      return 'Default (Users vote to expel other members, percentage required = percentage required for proposal to pass)';
    } else if (val == 'UVU') {
      return 'Users vote to expel members, unanimous';
    } else if (val == 'UVP') {
      return 'Users vote to expel members, any percentage';
    } else if (val == 'AAE') {
      return 'Admin/Admins can expel members';
    }
  };
  
  export const getGroupInvite = val => {
    if (val == 'D') {
      return 'Users vote to add member, percentage required equals percentage required for proposal to pass';
    } else if (val == 'UVU') {
      return 'Users vote to add members, unanimous';
    } else if (val == 'UVP') {
      return 'Users vote to add members, any percentage';
    } else if (val == 'AAG') {
      return 'Admin/Admins adds users to group';
    } else {
      return 'Anyone can add new users';
    }
  };
  
  export const getVotingPeriod = val => {
    if (val == 'D') {
      return 'Default (If enough YES/NO votes are achieved, the vote ends)';
    } else if (val == 'EV') {
      return 'Voting ends once everyone has voted';
    } else if (val == 'TBV') {
      return 'Vote is time based, and expires when time expires';
    }
  };
  
  export const getAccessType = val => {
    if (val == 'D') {
      return 'Public, request to join';
    } else if (val == 'FP') {
      return 'Full Private';
    } else if (val == 'PG') {
      return 'Private Group, but portfolio visible and on leaderboards';
    } else if (val == 'PJ') {
      return 'Public, anyone can join';
    } else if (val == 'PI') {
      return 'Private, invite only';
    }
  };
  
  export const getMaxNoOfProposal = val => {
    if (val == 'D') {
      return 'no limit';
    } else if (val == '10_D') {
      return '10 total per day';
    } else if (val == '50_W') {
      return '50 per week';
    } else if (val == '1_U') {
      return '1 for each user in club (n)';
    } else if (val == '2_U') {
      return '2 for each user in club (2n)';
    } else if (val == '5_U') {
      return '5 for each user in club (5n)';
    }
  };
  
  //status
  export const getVotingPeriodStatus = val => {
    if (val == 'Default (If enough YES/NO votes are achieved, the vote ends)') {
      return 'D';
    } else if (val == 'Voting ends once everyone has voted') {
      return 'EV';
    } else if (val == 'Vote is time based, and expires when time expires') {
      return 'TBV';
    }
  };
  
  export const getAbstainStatus = val => {
    if (val == 'Abstains removed from vote') {
      return 'D';
    } else if (val == 'Abstains count as YES') {
      return 'Y';
    } else if (val == 'Abstains count as NO') {
      return 'N';
    } else if (val == 'Abstain') {
      return 'A';
    }
  };
  
  export const getSuggestionStatus = val => {
    if (val == 'Allowed 1 per proposal') {
      return 'D';
    } else if (val == 'Not allowed') {
      return 'NA';
    } else if (val == 'Allowed (1 per week)') {
      return 'AW';
    } else if (val == 'Allowed (1 per day)') {
      return 'AD';
    }
  };
  
  export const getProposalCancellationStatus = val => {
    if (val == 'No Cancellation') {
      return 'D';
    } else if (val == 'Proposal creator can cancel vote anytime') {
      return 'PCA';
    } else if (val == 'Proposal creator can cancel vote if no one has voted') {
      return 'PCNV';
    } else if (
      val == 'Proposal can be canceled by creator if suggestion has been made'
    ) {
      return 'PCS';
    }
  };
  
  export const getAutoAbstainStatus = val => {
    if (val == 'Allowed, Members set hours anytime') {
      return 'D';
    } else if (val == 'Not allowed') {
      return 'NA';
    } else if (val == 'Allowed but hours must be set 12 hours in advance') {
      return 'AH';
    } else if (val == 'Allowed but hours must be set 1 day in advance') {
      return 'AD';
    }
  };
  
  export const getProposalSubmissionLimitStatus = val => {
    if (val == 'no limit') {
      return 'D';
    } else if (val == '1 per day per user') {
      return '1_D';
    } else if (val == '3 per day per user') {
      return '3_D';
    }
  };
  
  export const getMaxProposalForClubStatus = val => {
    if (val == 'no limit') {
      return 'D';
    } else if (val == '10 total per day') {
      return '10_D';
    } else if (val == '50 per week') {
      return '50_W';
    } else if (val == '1 for each user in club (n)') {
      return '1_U';
    } else if (val == '2 for each user in club (2n)') {
      return '2_U';
    } else if (val == '5 for each user in club (5n)') {
      return '5_U';
    }
  };
  export const getAccessTypeStatus = val => {
    if (val == 'Public, request to join') {
      return 'D';
    } else if (val == 'Full Private') {
      return 'FP';
    } else if (
      val == 'Private Group, but portfolio visible and on leaderboards'
    ) {
      return 'PG';
    } else if (val == 'Public, anyone can join') {
      return 'PJ';
    } else if (val == 'Private, invite only') {
      return 'PI';
    }
  };
  
  export const getGroupInviteStatus = val => {
    if (
      val ==
      'Users vote to add member, percentage required equals percentage required for proposal to pass'
    ) {
      return 'D';
    } else if (val == 'Users vote to add members, unanimous') {
      return 'UVU';
    } else if (val == 'Users vote to add members, any percentage') {
      return 'UVP';
    } else if (val == 'Admin/Admins adds users to group') {
      return 'AAG';
    } else if (val == 'Anyone can add new users') {
      return 'ANU';
    }
  };
  
  export const getAbstainPenalityStatus = val => {
    if (val == 'No penalty') {
      return 'D';
    } else if (val == 'Voting privileges removed 1 week for excessive abstains') {
      return 'VRW';
    } else if (
      val == 'Proposal privileges removed 1 week for excessive abstains'
    ) {
      return 'PRW';
    }
  };
  export const getSubmissionStatus = val => {
    if (val == 'Proposal is binding, automatically submitted') {
      return 'D';
    } else if (val == 'Person who created proposal submits trade') {
      return 'WPS';
    } else if (val == 'Group admin submits trade') {
      return 'GAS';
    }
  };
  
  export const getSettingsChangesStatus = val => {
    if (
      val ==
      'Users vote to change settings, percentage required = percentage required for proposal to pass'
    ) {
      return 'D';
    } else if (val == 'Users vote to change settings, unanimous') {
      return 'UVU';
    } else if (val == 'Users vote to change settings, any percentage') {
      return 'UVP';
    } else if (val == 'Admin/Admins changes settings') {
      return 'AAS';
    }
  };
  
  export const getExplusionStatus = val => {
    if (
      val ==
      'Default (Users vote to expel other members, percentage required = percentage required for proposal to pass)'
    ) {
      return 'D';
    } else if (val == 'Users vote to expel members, unanimous') {
      return 'UVU';
    } else if (val == 'Users vote to expel members, any percentage') {
      return 'UVP';
    } else if (val == 'Admin/Admins can expel members') {
      return 'AAE';
    }
  };
  //function : manager club status
  export const getPublicStatsStatus = val => {
    if (val == 'Default (Manager mode stats are public)') {
      return 'D';
    } else if (val == 'Private') {
      return 'P';
    }
  };
  
  export const getRequestToJoinStatus = val => {
    if (val == 'Default(Manager invites only)') {
      return 'D';
    } else if (val == 'Manager Club is Open') {
      return 'MCO';
    } else if (val == 'Individuals can request to join') {
      return 'IRJ';
    }
  };
  //function : manager club val
  export const getPublicStatsVal = val => {
    if (val == 'D') {
      return `Default (Manager mode stats are public)`;
    } else if (val == `P`) {
      return `Private`;
    }
  };
  export const getRequestToJoinVal = val => {
    if (val == 'D') {
      return `Default(Manager invites only)`;
    } else if (val == 'MCO') {
      return `Manager Club is Open`;
    } else if (val == 'IRJ') {
      return `Individuals can request to join`;
    }
  };
  