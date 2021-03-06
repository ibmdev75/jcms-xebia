package custom.stat;

import com.jalios.jcms.Content;
import com.jalios.jcms.stat.beautifier.BeautifierData;
import com.jalios.jcms.stat.listener.AbstractStatMultiListener;
import com.jalios.jcms.stat.listener.StatPublicationListener;
import com.jalios.util.Beautifier;

/** 
 * @author      Jean-Philippe Encausse
 * @since       jcms-5.0.0
 */
public class PrintViewListener extends AbstractStatMultiListener{
  
  public PrintViewListener(){
    super(ALL_AREA);
    
    addListener(new UrlListener(ALL_AREA, null, null, ".*printView=true.*"));
    addListener(new StatPublicationListener(ALL_AREA, "Entry",true,Content.class,false));
  }
  
  /**
   * @see com.jalios.jcms.stat.listener.AbstractStatFieldListener#getBeautifier()
   */
  @Override
  public Beautifier getBeautifier() {
    if (beautifier == null){
      beautifier = new BeautifierData(TRUNCATE);
    }
    return super.getBeautifier();
  }
}
