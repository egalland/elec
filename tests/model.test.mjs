import {test} from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import {readFile} from 'node:fs/promises';
import * as THREE from '../dist/three.module.js';
import {combGroups} from '../dist/board-core.js';

const source=await readFile(new URL('../dist/app.js',import.meta.url),'utf8');
const geometryFunctions=source.slice(source.indexOf('function label('),source.indexOf('function setup3d('));
const combFunction=source.slice(source.indexOf('function buildCombs('),source.indexOf('function drawFallbackCombs('));
for(const type of ['none','pin','fork'])test(`géométrie Three.js et liaisons finies : ${type}`,()=>{
 const rows=Array.from({length:4},(_,r)=>[{id:`id-${r}`,cat:'id',modules:2,amp:40,type:'A',label:'Différentiel'},...Array.from({length:3},(_,i)=>({id:`dj-${r}-${i}`,cat:'breaker',modules:1,amp:20,poles:'1P+N',label:'Circuit'}))]);
 const document={createElement(){
   return {width:768,height:160,getContext(){
     return {fillRect(){},fillText(){},measureText(s){return {width:s.length*24};}};
   }};
 }};
 const context={THREE,combGroups,document,state:{rows,combs:[type,type,type,type],verticalComb:true},selected:'dj-0-0',exploded:true,wireMode:'all',renderer:{},scene:new THREE.Scene(),model:null,devices:[],wireMeshes:[],combMeshes:[],$:()=>({checked:false}),findSelected:()=>({d:rows[0][1],r:0,i:1})};
 vm.createContext(context);vm.runInContext(geometryFunctions+'\n'+combFunction+'\nbuildModel();',context);
 assert.equal(context.devices.length,16);assert.ok(context.wireMeshes.length>20);
 if(type==='none')assert.equal(context.combMeshes.length,2);else assert.ok(context.combMeshes.length>30);
 context.model.traverse(o=>{if(!o.geometry)return;for(const n of o.geometry.attributes.position.array)assert.ok(Number.isFinite(n),'Coordonnée géométrique invalide');assert.ok(Number.isFinite(o.position.x)&&Number.isFinite(o.position.y)&&Number.isFinite(o.position.z));});
});
