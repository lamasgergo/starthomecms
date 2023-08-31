<?php
namespace App\Test\TestCase\Model\Table;

use App\Model\Table\PropertiesDocumentsTable;
use Cake\ORM\TableRegistry;
use Cake\TestSuite\TestCase;

/**
 * App\Model\Table\PropertiesDocumentsTable Test Case
 */
class PropertiesDocumentsTableTest extends TestCase
{

    /**
     * Fixtures
     *
     * @var array
     */
    public $fixtures = [
        'PropertiesDocuments' => 'app.properties_documents',
        'Properties' => 'app.properties',
        'Cities' => 'app.cities',
        'Cityparts' => 'app.cityparts',
        'Districts' => 'app.districts',
        'Streets' => 'app.streets',
        'Users' => 'app.users',
        'Roles' => 'app.roles',
        'PropertiesUsers' => 'app.properties_users',
        'Contacts' => 'app.contacts',
        'Companies' => 'app.companies',
        'ContactsUsers' => 'app.contacts_users',
        'PropertiesContacts' => 'app.properties_contacts',
        'Rentvar' => 'app.rentvar',
        'Sellvar' => 'app.sellvar',
        'Mainimage' => 'app.mainimage',
        'Contact' => 'app.contact',
        'PropertiesVariations' => 'app.properties_variations'
    ];

    /**
     * setUp method
     *
     * @return void
     */
    public function setUp()
    {
        parent::setUp();
        $config = TableRegistry::exists('PropertiesDocuments') ? [] : ['className' => 'App\Model\Table\PropertiesDocumentsTable'];
        $this->PropertiesDocuments = TableRegistry::get('PropertiesDocuments', $config);
    }

    /**
     * tearDown method
     *
     * @return void
     */
    public function tearDown()
    {
        unset($this->PropertiesDocuments);

        parent::tearDown();
    }

    /**
     * Test initialize method
     *
     * @return void
     */
    public function testInitialize()
    {
        $this->markTestIncomplete('Not implemented yet.');
    }

    /**
     * Test validationDefault method
     *
     * @return void
     */
    public function testValidationDefault()
    {
        $this->markTestIncomplete('Not implemented yet.');
    }

    /**
     * Test buildRules method
     *
     * @return void
     */
    public function testBuildRules()
    {
        $this->markTestIncomplete('Not implemented yet.');
    }

    /**
     * Test searchConfiguration method
     *
     * @return void
     */
    public function testSearchConfiguration()
    {
        $this->markTestIncomplete('Not implemented yet.');
    }
}
