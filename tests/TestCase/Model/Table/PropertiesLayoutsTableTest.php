<?php
namespace App\Test\TestCase\Model\Table;

use App\Model\Table\PropertiesLayoutsTable;
use Cake\ORM\TableRegistry;
use Cake\TestSuite\TestCase;

/**
 * App\Model\Table\PropertiesLayoutsTable Test Case
 */
class PropertiesLayoutsTableTest extends TestCase
{

    /**
     * Fixtures
     *
     * @var array
     */
    public $fixtures = [
        'PropertiesLayouts' => 'app.properties_layouts',
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
        $config = TableRegistry::exists('PropertiesLayouts') ? [] : ['className' => 'App\Model\Table\PropertiesLayoutsTable'];
        $this->PropertiesLayouts = TableRegistry::get('PropertiesLayouts', $config);
    }

    /**
     * tearDown method
     *
     * @return void
     */
    public function tearDown()
    {
        unset($this->PropertiesLayouts);

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
