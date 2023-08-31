<?php
namespace App\Test\TestCase\Model\Table;

use App\Model\Table\PropertyVariationsTable;
use Cake\ORM\TableRegistry;
use Cake\TestSuite\TestCase;

/**
 * App\Model\Table\PropertyVariationsTable Test Case
 */
class PropertyVariationsTableTest extends TestCase
{

    /**
     * Fixtures
     *
     * @var array
     */
    public $fixtures = [
        'app.property_variations',
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
        'app.contacts_users',
        'app.properties_contacts'
    ];

    /**
     * setUp method
     *
     * @return void
     */
    public function setUp()
    {
        parent::setUp();
        $config = TableRegistry::exists('PropertyVariations') ? [] : ['className' => 'App\Model\Table\PropertyVariationsTable'];
        $this->PropertyVariations = TableRegistry::get('PropertyVariations', $config);
    }

    /**
     * tearDown method
     *
     * @return void
     */
    public function tearDown()
    {
        unset($this->PropertyVariations);

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
