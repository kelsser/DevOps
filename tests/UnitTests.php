<?php
use PHPUnit\Framework\TestCase;

class UnitTests extends TestCase
{
    public function testTrueIsTrue()
    {
        $this->assertTrue(true);
    }

    public function testOnePlusOneEqualsTwo()
    {
        $this->assertEquals(2, 1 + 1);
    }

    public function testStringIsString()
    {
        $this->assertIsString("hello");
    }

    public function testArrayHasArray()
    {
        $this->assertArrayHasKey('key', ['key' => 'value']);
    }

    public function testValueIsInArray()
    {
        $this->assertContains(3, [1, 2, 3]);
    }
}
?>