<?php
namespace App\Test\TestCase\Model\Table;

use App\Model\Table\SentPropertiesContactsTable;
use Cake\ORM\TableRegistry;
use Cake\TestSuite\TestCase;

/**
 * App\Model\Table\SentPropertiesContactsTable Test Case
 */
class SentPropertiesContactsTableTest extends TestCase
{

    /**
     * Fixtures
     *
     * @var array
     */
    public $fixtures = [
        'app.sent_properties_contacts',
        'app.properties',
        'app.cities',
        'app.cityparts',
        'app.districts',
        'app.streets',
        'app.users',
        'app.roles',
        'app.properties_users',
        'app.contacts',
        'app.companies',
        'app.internal_company',
        'app.contacts_users',
        'app.contacts_properties',
        'app.properties_contacts',
        'app.rentvar',
        'app.sellvar',
        'app.mainimage',
        'app.contact',
        'app.properties_variations',
        'app.properties_layouts',
        'app.properties_images',
        'app.properties_documents'
    ];

    /**
     * setUp method
     *
     * @return void
     */
    public function setUp()
    {
        parent::setUp();
        $config = TableRegistry::exists('SentPropertiesContacts') ? [] : ['className' => 'App\Model\Table\SentPropertiesContactsTable'];
        $this->SentPropertiesContacts = TableRegistry::get('SentPropertiesContacts', $config);
    }

    /**
     * tearDown method
     *
     * @return void
     */
    public function tearDown()
    {
        unset($this->SentPropertiesContacts);

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
}
