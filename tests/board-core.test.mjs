import {test} from 'node:test';
import assert from 'node:assert/strict';
import {moveDevice, usedModules, combGroups} from '../dist/board-core.js';
const id=n=>({id:n,cat:'id',modules:2});
const dj=(n,modules=1,poles='1P+N')=>({id:n,cat:'breaker',modules,poles});
test('déplacement entre rangées et position aimantée, sans mutation',()=>{
 const rows=[[id('a'),dj('b'),dj('c')],[id('d'),dj('e')],[],[]];
 const result=moveDevice(rows,'c',1,2.1);
 assert.deepEqual(result.rows.map(r=>r.map(x=>x.id)),[['a','b'],['d','c','e'],[],[]]);
 assert.deepEqual(rows[0].map(x=>x.id),['a','b','c']);
});
test('réordonnancement sur une rangée pleine, sans perdre un appareil',()=>{
 const rows=[[id('a'),...Array.from({length:11},(_,i)=>dj('d'+i))],[],[],[]];
 const result=moveDevice(rows,'d10',0,2);
 assert.equal(result.rows[0][1].id,'d10');assert.equal(usedModules(result.rows[0]),13);
 assert.equal(new Set(result.rows[0].map(x=>x.id)).size,12);
});
test('refus d’une destination pleine, origine intacte',()=>{
 const rows=[[dj('move',2)],[id('a'),...Array.from({length:11},(_,i)=>dj('d'+i))],[],[]];
 assert.match(moveDevice(rows,'move',1,4).error,/Pas assez/);assert.equal(rows[0][0].id,'move');
});
test('les peignes ne réunissent pas deux groupes différentiels',()=>{
 const groups=combGroups([id('a'),dj('b'),id('c'),dj('d'),{id:'aux',cat:'other'},dj('e'),id('f'),dj('g',4,'4P')]);
 assert.deepEqual(groups.map(g=>[g.id.id,g.devices.map(d=>d.id)]),[['a',['b']],['c',['d']]]);
});
test('dépôt identique et destination hors tableau',()=>{
 const rows=[[id('a'),dj('b')],[],[],[]];
 assert.equal(moveDevice(rows,'b',0,13).unchanged,true);
 assert.ok(moveDevice(rows,'b',4,0).error);assert.ok(moveDevice(rows,'absent',0,0).error);
});
