import { UseHelmetProps } from "@/interface/helmet";
import { Helmet } from 'react-helmet-async';

const useHelmet = ({ title, description, metaTags, loading }: UseHelmetProps) => {
    if (loading) {
      return (
        <Helmet>
          <title>Loading...</title>
        </Helmet>
      );
    }
    return (
      <Helmet>
        {title && <title>{title}</title>}
        {description && <meta name="description" content={description} />}
        {metaTags && metaTags.map((meta, index) => (
          <meta key={index} name={meta.name} content={meta.content} />
        ))}
      </Helmet>
    );
  };

  export default useHelmet;
