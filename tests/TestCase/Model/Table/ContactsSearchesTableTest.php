<?php
namespace App\Test\TestCase\Model\Table;

use App\Model\Table\ContactsSearchesTable;
use Cake\ORM\TableRegistry;
use Cake\TestSuite\TestCase;

/**
 * App\Model\Table\ContactsSearchesTable Test Case
 */
class ContactsSearchesTableTest extends TestCase
{

    /**
     * Fixtures
     *
     * @var array
     */
    public $fixtures = [
        'app.contacts_searches',
        'app.contacts',
        'app.companies',
        'app.internal_company',
        'app.users',
        'app.roles',
        'app.contacts_users',
        'app.properties',
        'app.cities',
        'app.cityparts',
        'app.districts',
        'app.streets',
        'app.properties_users',
        'app.properties_contacts',
        'app.rentvar',
        'app.sellvar',
        'app.mainimage',
        'app.contact',
        'app.contacts_properties',
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
        $config = TableRegistry::exists('ContactsSearches') ? [] : ['className' => 'App\Model\Table\ContactsSearchesTable'];
        $this->ContactsSearches = TableRegistry::get('ContactsSearches', $config);
    }

    /**
     * tearDown method
     *
     * @return void
     */
    public function tearDown()
    {
        unset($this->ContactsSearches);

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
