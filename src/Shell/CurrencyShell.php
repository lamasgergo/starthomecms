<?php
namespace App\Shell;

use Cake\Console\Shell;
use Cake\Filesystem\File;
use Cake\Utility\Inflector;
use Cake\ORM\Table;
use Cake\Datasource\ConnectionManager;
use Cake\Utility\Xml;
use SoapClient;

class CurrencyShell extends Shell
{

    public function main()
    {
        $this->out('Start');

        $client = new SoapClient('http://www.mnb.hu/arfolyamok.asmx?wsdl');

        //var_dump($client->__getFunctions());
        $xml = Xml::build($client->GetCurrentExchangeRates()->GetCurrentExchangeRatesResult);
        $xmlArray = Xml::toArray($xml);
        $content = '<?php
 return [
';
        if ($xmlArray['MNBCurrentExchangeRates']['Day']['Rate']) {
            foreach ($xmlArray['MNBCurrentExchangeRates']['Day']['Rate'] as $oneCurr) {
                $this->out($oneCurr['@curr'] . ':' . $oneCurr['@']);
                $content .= "'" . $oneCurr['@curr'] . "' => " . str_replace(',', '.', $oneCurr['@']) . ',
    ';

            }
            $content .= '];';
            $this->out('Writing: ' . ROOT . DS . 'config' . DS . 'currency.php');
            $file = new File(ROOT . DS . 'config' . DS . 'currency.php');
            $file->write($content);
            $file->close();
            echo $content;
        }
    }

}