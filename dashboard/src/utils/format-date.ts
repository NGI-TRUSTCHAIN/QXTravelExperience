import { LocaleData } from "@/interface/language";
import { format, isThisWeek, isToday, subDays } from "date-fns";
import ReactTimeago from "react-timeago";

export const formatDate = ({ date }: { date: string | Date }) => {
  return format(date, "yyyy-MM-dd");
};

export const formatDate2 = (date: Date) => {
  if (isToday(date)) {
    return format(date, "HH:mm");
  } else if (isThisWeek(date)) {
    return format(date, "EEEE p");
  } else {
    return format(date, "MMM d p");
  }
};

export const formatDate3 = (date: Date) => {
  if (isToday(date)) {
    return "Today";
  }
  const sixDaysAgo = subDays(new Date(), 6);
  if (date > sixDaysAgo) {
    return format(date, "EEEE");
  } else {
    return format(date, "dd.MM.yyyy");
  }
};

export const ReactTimeAgoFormatter = (value : number, unit : ReactTimeago.Unit, suffix: ReactTimeago.Suffix) => {
  if (unit === 'second') {
    return '1 minute ' + suffix;
  }
  if (unit === 'minute') {
    const rounded = Math.round(value);
    return `${rounded} minute${rounded === 1 ? '' : 's'} ${suffix}`;
  }
  return `${value} ${unit}${value > 1 ? 's' : ''} ${suffix}`;
};

export const createLocalizedTimeAgoFormatter = (languageData: LocaleData) => {
  // const { languageData } = useLanguage();
  const { TimeAgo } = languageData;

  return (value: number, unit: ReactTimeago.Unit, suffix: ReactTimeago.Suffix): string => {
    if (value === 0 && suffix === 'ago') {
      return TimeAgo.now;
    }

    if (unit === 'second') {
      return TimeAgo.seconds.replace('{{value}}', value.toString()) + (suffix === 'ago' ? ` ${TimeAgo.ago}` : ` ${TimeAgo.fromNow}`);
    }

    let localizedUnit = '';
    switch (unit) {
      case 'minute':
        localizedUnit = value === 1 ? TimeAgo.minute : TimeAgo.minutes.replace('{{value}}', value.toString());
        break;
      case 'hour':
        localizedUnit = value === 1 ? TimeAgo.hour : TimeAgo.hours.replace('{{value}}', value.toString());
        break;
      case 'day':
        localizedUnit = value === 1 ? TimeAgo.day : TimeAgo.days.replace('{{value}}', value.toString());
        break;
      case 'week':
        localizedUnit = value === 1 ? TimeAgo.week : TimeAgo.weeks.replace('{{value}}', value.toString());
        break;
      case 'month':
        localizedUnit = value === 1 ? TimeAgo.month : TimeAgo.months.replace('{{value}}', value.toString());
        break;
      case 'year':
        localizedUnit = value === 1 ? TimeAgo.year : TimeAgo.years.replace('{{value}}', value.toString());
        break;
      default:
        localizedUnit = `${value} ${unit}${value > 1 ? 's' : ''}`;
    }

    return `${localizedUnit} ${suffix === 'ago' ? ` ${TimeAgo.ago}` : ` ${TimeAgo.fromNow}`}`;
  };
};